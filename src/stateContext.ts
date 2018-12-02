import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {StateValueSelector} from './stateValueSelector';

export class StateContext<StateModel> {
    private readonly state$: BehaviorSubject<Readonly<StateModel>>;

    constructor(initialState: Readonly<StateModel>) {
        const copy = Object.assign({}, initialState);
        this.state$ = new BehaviorSubject<Readonly<StateModel>>(copy);
    }

    getState(): Readonly<StateModel> {
        return this.state$.getValue();
    }

    patchState(newState: Partial<StateModel>) {
        const current = this.state$.getValue();
        const merged = Object.assign({}, current, newState);
        this.state$.next(merged);
    }

    selectValue<V>(selector: StateValueSelector<StateModel, V>): V {
        return selector(this.getState());
    }

    select<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this.state$.pipe(
            map(selector),
            distinctUntilChanged()
        );
    }

    selectOnce<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this.select(selector).pipe(take(1));
    }
}
