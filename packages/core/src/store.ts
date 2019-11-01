import {BehaviorSubject, Observable, Subject} from 'rxjs';

export function createStore<State extends object>(
  initialState: Readonly<State>,
) {
  return new Store<State>(initialState);
}

export class Store<State extends object> {
  private readonly store: BehaviorSubject<Readonly<State>>;
  private readonly storeChanges = new Subject<Readonly<State>>();

  private isUpdating: boolean = false;
  private pendingPatch: Readonly<Partial<State>> | undefined = undefined;

  constructor(initialState: Readonly<State>) {
    this.store = new BehaviorSubject(initialState);
    this.state$ = this.store.asObservable();
    this.changes$ = this.storeChanges.asObservable();
  }

  get state(): Readonly<State> {
    return this.store.getValue();
  }

  readonly state$: Observable<Readonly<State>>;
  readonly changes$: Observable<Readonly<State>>;

  update(patch: Partial<Readonly<State>> | null | undefined) {
    if (patch === undefined || patch === null) {
      return;
    }
    this.applyPatch(patch);
  }

  private applyPatch(patch: Partial<Readonly<State>>) {
    if (this.isUpdating) {
      this.pendingPatch = Object.assign(this.pendingPatch || {}, patch);
      return;
    }

    this.pendingPatch = undefined;

    const state = this.store.getValue();
    const hasDifference = Object.getOwnPropertyNames(patch).some(
      key => (state as any)[key] !== (patch as any)[key],
    );
    if (!hasDifference) {
      return;
    }

    const nextState = Object.assign({}, state, patch);

    this.isUpdating = true;
    this.store.next(nextState);
    this.storeChanges.next(nextState);
    this.isUpdating = false;

    if (this.pendingPatch) {
      this.applyPatch(this.pendingPatch);
    }
  }
}
