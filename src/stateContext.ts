import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {StateValueSelector} from './stateValueSelector';

export class StateContext<StateModel> {
    private readonly state$: BehaviorSubject<Readonly<StateModel>>;
    private readonly stateUpdates$: Subject<Readonly<StateModel>>;

    constructor(initialState: Readonly<StateModel>) {
        const copy = Object.assign({}, initialState);
        this.state$ = new BehaviorSubject<Readonly<StateModel>>(copy);
        this.stateUpdates$ = new Subject<Readonly<StateModel>>();
    }

    getState(): Readonly<StateModel> {
        return this.state$.getValue();
    }

    patchState(newState: Partial<StateModel>) {
        const current = this.state$.getValue();
        const merged = Object.assign({}, current, newState);
        this.state$.next(merged);
        this.stateUpdates$.next(merged);
    }

    getValue<V>(selector: StateValueSelector<StateModel, V>): V {
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

    observe<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this.stateUpdates$.pipe(
            map(selector),
            distinctUntilChanged()
        );
    }

    observeOnce<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return this.observe(selector).pipe(take(1));
    }
}
