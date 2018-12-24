import {Consumer} from './pubsub/consumer';
import {Subscription} from './pubsub/subscription';
import {StateDescriptor} from './stateDescriptor';
import {StateValueSelector} from './stateValueSelector';
import {Store} from './store';

export class StateAccessor<StateModel> {
    protected readonly _store: Store;
    protected readonly _descriptor: StateDescriptor<StateModel>;

    constructor(store: Store, descriptor: StateDescriptor<StateModel>) {
        this._store = store;
        this._descriptor = descriptor;
    }

    get current(): Readonly<StateModel> {
        return this._store.getState(this._descriptor);
    }

    patch(newState: Partial<StateModel>) {
        return this._store.patchState(this._descriptor, newState);
    }

    reset(newState?: Partial<StateModel>) {
        return this._store.resetState(this._descriptor, newState);
    }

    getValue<V>(selector: StateValueSelector<StateModel, V>): V {
        return this._store.getValue(this._descriptor, selector);
    }

    listen<V>(selector: StateValueSelector<StateModel, V>, consumer: Consumer<V>): Subscription {
        return this._store.listen(this._descriptor, selector, consumer);
    }

    listenChanges<V>(
        selector: StateValueSelector<StateModel, V>,
        consumer: Consumer<V>,
        onlyOnce?: boolean
    ): Subscription {
        return this._store.listenChanges(this._descriptor, selector, consumer, onlyOnce);
    }
}
