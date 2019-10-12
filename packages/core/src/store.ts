import {BehaviorSubject, Observable} from 'rxjs';

export class Store<State extends object> {
  private readonly store: BehaviorSubject<Readonly<State>>;
  private isStateUpdating: boolean = false;
  private pendingResetState: Readonly<State> | undefined = undefined;
  private pendingPatchState: Readonly<Partial<State>> | undefined = undefined;

  readonly state$: Observable<Readonly<State>>;

  constructor(initialState: Readonly<State>) {
    this.store = new BehaviorSubject(initialState);
    this.state$ = this.store.asObservable();
  }

  get state(): Readonly<State> {
    return this.store.getValue();
  }

  reset(state: Readonly<State>) {
    this.pendingResetState = state;
    this.pendingPatchState = undefined;
    this.applyPendingStates();
  }

  update(patch: Partial<Readonly<State>> | null | undefined) {
    if (patch === undefined || patch === null) {
      return;
    }

    if (this.isStateUpdating) {
      this.pendingPatchState = Object.assign({}, this.pendingPatchState, patch);
    } else {
      this.pendingPatchState = patch;
    }
    this.applyPendingStates();
  }

  private hasDifference(patch: Partial<Readonly<State>>): boolean {
    const state = this.store.getValue();
    const keys = Object.getOwnPropertyNames(patch);
    return keys.some(key => (state as any)[key] !== (patch as any)[key]);
  }

  private applyPendingStates() {
    if (this.isStateUpdating) {
      return;
    }
    if (
      this.pendingResetState === undefined &&
      this.pendingPatchState === undefined
    ) {
      return;
    }

    let nextState = this.state;
    if (this.pendingResetState) {
      nextState = this.pendingResetState;
    }
    if (this.pendingPatchState) {
      nextState = Object.assign({}, nextState, this.pendingPatchState);
    }

    this.pendingResetState = undefined;
    this.pendingPatchState = undefined;

    if (this.hasDifference(nextState)) {
      this.isStateUpdating = true;
      this.store.next(nextState);
      this.isStateUpdating = false;
    }

    if (this.pendingResetState || this.pendingPatchState) {
      this.applyPendingStates();
    }
  }
}
