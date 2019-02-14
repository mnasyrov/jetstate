import {Projection} from './projection';
import {ProjectionBuilder} from './projectionBuilder';
import {Consumer} from './pubsub/consumer';
import {Emitter} from './pubsub/emitter';
import {Subscription} from './pubsub/subscription';
import {StateValueSelector} from './stateValueSelector';

export class State<Model extends object> {
    static readonly compute = ProjectionBuilder.from;

    private readonly emitter: Emitter<Readonly<Model>> = new Emitter<Readonly<Model>>();
    private state: Readonly<Model>;
    private isStateUpdating: boolean = false;
    private pendingResetState: Readonly<Model> | undefined = undefined;
    private pendingPatchState: Readonly<Partial<Model>> | undefined = undefined;

    constructor(defaults?: Readonly<Model>) {
        this.state = Object.assign({}, defaults) as Model;
    }

    get current(): Readonly<Model> {
        return this.state;
    }

    reset(newState: Readonly<Model>) {
        this.pendingResetState = Object.assign({}, newState);
        this.pendingPatchState = undefined;
        this.applyPendingStates();
    }

    patch(newState: Partial<Readonly<Model>>) {
        if (newState === undefined || newState === null) {
            return;
        }

        if (this.isStateUpdating) {
            this.pendingPatchState = Object.assign({}, this.pendingPatchState, newState);
        } else {
            this.pendingPatchState = newState;
        }
        this.applyPendingStates();
    }

    getValue<V>(selector: StateValueSelector<Model, V>): V {
        return selector(this.state);
    }

    listen<V>(selector: StateValueSelector<Model, V>, consumer: Consumer<V>): Subscription {
        return this.bindSelectorListener(selector, consumer, true);
    }

    listenChanges<V>(selector: StateValueSelector<Model, V>, consumer: Consumer<V>): Subscription {
        return this.bindSelectorListener(selector, consumer, false);
    }

    pick<V>(selector: StateValueSelector<Model, V>): Projection<V> {
        const state = this;
        return {
            getValue(): V {
                return state.getValue(selector);
            },

            listen(consumer: Consumer<V>) {
                return state.listen(selector, consumer);
            },

            listenChanges(consumer: Consumer<V>) {
                return state.listenChanges(selector, consumer);
            }
        };
    }

    private applyPendingStates() {
        if (this.isStateUpdating) {
            return;
        }

        this.isStateUpdating = true;
        try {
            let nextState = this.pendingResetState ? this.pendingResetState : this.state;
            if (this.pendingPatchState) {
                nextState = Object.assign({}, nextState, this.pendingPatchState);
            }

            this.pendingResetState = undefined;
            this.pendingPatchState = undefined;
            this.state = nextState;

            this.emitter.emit(this.state);
        } catch (error) {
            this.isStateUpdating = false;
            throw error;
        }
        this.isStateUpdating = false;

        if (this.pendingResetState || this.pendingPatchState) {
            this.applyPendingStates();
        }
    }

    private bindSelectorListener<V>(
        selector: StateValueSelector<Model, V>,
        consumer: Consumer<V>,
        pushCurrent: boolean
    ): Subscription {
        let currentValue: V;

        const subscription = this.emitter.subscribe((state: Model) => {
            const value = selector(state);
            if (value !== currentValue) {
                currentValue = value;
                consumer(value);
            }
        });

        // Push a current state to the consumer of the selected value;
        if (pushCurrent) {
            try {
                currentValue = selector(this.state);
                consumer(currentValue);
            } catch (error) {
                subscription.unsubscribe();
                throw error;
            }
        }

        return subscription;
    }
}
