import {Consumer, Emitter, Subscription} from '@mnasyrov/pubsub';
import {Projection} from './projection';

export class Store<State extends object>
  implements Projection<Readonly<State>> {
  private readonly emitter: Emitter<Readonly<State>> = new Emitter<
    Readonly<State>
  >();
  private state: Readonly<State>;
  private isStateUpdating: boolean = false;
  private pendingResetState: Readonly<State> | undefined = undefined;
  private pendingPatchState: Readonly<Partial<State>> | undefined = undefined;

  constructor(initialState: Readonly<State>) {
    this.state = Object.assign({}, initialState) as State;
  }

  get value(): Readonly<State> {
    return this.state;
  }

  subscribe(subscriber: Consumer<Readonly<State>>): Subscription {
    return this.emitter.subscribe((state: State) => subscriber(state));
  }

  reset(state: Readonly<State>) {
    this.pendingResetState = Object.assign({}, state);
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

  hasChanges(patch: Partial<Readonly<State>>): boolean {
    const keys = Object.getOwnPropertyNames(patch);
    // @ts-ignore
    return keys.some(key => this.state[key] !== patch[key]);
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

    this.isStateUpdating = true;
    try {
      let nextState = this.pendingResetState
        ? this.pendingResetState
        : this.state;
      if (this.pendingPatchState) {
        nextState = Object.assign({}, nextState, this.pendingPatchState);
      }

      this.pendingResetState = undefined;
      this.pendingPatchState = undefined;

      if (this.hasChanges(nextState)) {
        this.state = nextState;
        this.emitter.emit(this.state);
      }
    } catch (error) {
      this.isStateUpdating = false;
      throw error;
    }
    this.isStateUpdating = false;

    if (this.pendingResetState || this.pendingPatchState) {
      this.applyPendingStates();
    }
  }
}
