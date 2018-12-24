import {Consumer, Emitter, Subscription} from '../pubsub';
import {StateValueSelector} from '../stateValueSelector';

/**
 * @internal
 */
export class StateContext<StateModel> {
    private readonly key: string;
    private readonly defaults: Readonly<StateModel> | undefined;
    private readonly emitter: Emitter<Readonly<StateModel>>;
    private readonly selectedValues = new WeakMap<StateValueSelector<StateModel, any>, any>();
    private state: Readonly<StateModel>;
    private isStateUpdating: boolean = false;
    private pendingState: Readonly<StateModel> | undefined = undefined;

    constructor(key: string, defaults: Readonly<StateModel> | undefined) {
        this.key = key;
        this.defaults = defaults;
        this.emitter = new Emitter<Readonly<StateModel>>();
        this.state = Object.assign({}, defaults);
    }

    getState(): Readonly<StateModel> {
        return this.state;
    }

    reset(newState?: Partial<StateModel>) {
        this.applyState(Object.assign({}, this.defaults, newState));
    }

    patch(newState: Partial<StateModel>) {
        this.applyState(Object.assign({}, this.state, newState));
    }

    getValue<V>(selector: StateValueSelector<StateModel, V>): V {
        return selector(this.state);
    }

    listen<V>(selector: StateValueSelector<StateModel, V>, consumer: Consumer<V>): Subscription {
        return this.bindSelector(selector, consumer, false);
    }

    listenChanges<V>(
        selector: StateValueSelector<StateModel, V>,
        consumer: Consumer<V>,
        onlyOnce?: boolean
    ): Subscription {
        if (onlyOnce) {
            const subscription = this.bindSelector(
                selector,
                value => {
                    subscription.unsubscribe();
                    consumer(value);
                },
                true
            );
            return subscription;
        }
        return this.bindSelector(selector, consumer, true);
    }

    private applyState(newState: StateModel) {
        if (this.isStateUpdating) {
            this.pendingState = Object.assign({}, this.pendingState, newState);
            return;
        }

        this.isStateUpdating = true;
        try {
            this.state = newState;
            this.emitter.emit(this.state);
        } catch (error) {
            this.isStateUpdating = false;
            throw error;
        }
        this.isStateUpdating = false;

        if (this.pendingState) {
            const detachedState = this.pendingState;
            this.pendingState = undefined;
            this.applyState(detachedState);
        }
    }

    private bindSelector<V>(
        selector: StateValueSelector<StateModel, V>,
        consumer: Consumer<V>,
        skipCurrent: boolean
    ): Subscription {
        const stateHandler: Consumer<StateModel> = state => {
            const currentValue = this.selectedValues.get(selector);
            const value = selector(state);
            if (value !== currentValue) {
                this.selectedValues.set(selector, value);
                consumer(value);
            }
        };
        const subscription = this.emitter.subscribe(stateHandler);

        // Pass a current state to the selector
        if (!skipCurrent) {
            try {
                stateHandler(this.state);
            } catch (error) {
                subscription.unsubscribe();
                throw error;
            }
        }

        return subscription;
    }
}
