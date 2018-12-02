import {Observable} from 'rxjs';
import {StateContext} from './stateContext';
import {StateValueSelector} from './stateValueSelector';

export abstract class StateAccessor<StateModel> {
    readonly context: StateContext<StateModel>;

    protected constructor(context: StateContext<StateModel>) {
        this.context = context;
    }

    get current(): Readonly<StateModel> {
        return this.context.getState();
    }

    patch(newState: Partial<StateModel>) {
        return this.context.patchState(newState);
    }

    select<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this.context.select(selector);
    }

    selectOnce<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this.context.selectOnce(selector);
    }

    selectValue<V>(selector: StateValueSelector<StateModel, V>): V {
        return this.context.selectValue(selector);
    }
}
