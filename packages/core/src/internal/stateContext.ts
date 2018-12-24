import {BehaviorSubject, Subject} from 'rxjs';

/**
 * @internal
 */
export class StateContext<StateModel> {
    readonly key: string;
    readonly defaults: Readonly<StateModel> | undefined;
    readonly state$: BehaviorSubject<Readonly<StateModel>>;
    readonly stateUpdates$: Subject<Readonly<StateModel>>;

    constructor(key: string, defaults: Readonly<StateModel> | undefined) {
        const initialState = Object.assign({}, defaults);
        this.key = key;
        this.defaults = defaults;
        this.state$ = new BehaviorSubject<Readonly<StateModel>>(initialState);
        this.stateUpdates$ = new Subject<Readonly<StateModel>>();
    }

    getState(): Readonly<StateModel> {
        return this.state$.getValue();
    }

    reset(newState?: Partial<StateModel>) {
        const state = Object.assign({}, this.defaults, newState);
        this.state$.next(state);
        this.stateUpdates$.next(state);
    }

    patch(newState: Partial<StateModel>) {
        const current = this.state$.getValue();
        const merged = Object.assign({}, current, newState);
        this.state$.next(merged);
        this.stateUpdates$.next(merged);
    }
}
