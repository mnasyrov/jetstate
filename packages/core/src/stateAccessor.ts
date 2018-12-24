import {Observable} from 'rxjs';
import {StateDescriptor} from './stateDescriptor';
import {StateValueSelector} from './stateValueSelector';
import {Store} from './store';

export class StateAccessor<StateModel> {
    private readonly _store: Store;
    private readonly _descriptor: StateDescriptor<StateModel>;

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

    select<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this._store.select(this._descriptor, selector);
    }

    selectOnce<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this._store.selectOnce(this._descriptor, selector);
    }

    observe<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this._store.observe(this._descriptor, selector);
    }

    observeOnce<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this._store.observeOnce(this._descriptor, selector);
    }
}
