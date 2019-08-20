import {Consumer, Emitter, Subscription} from '@mnasyrov/pubsub';
import {Projection} from './projection';

export type Selector<Model extends object, Value> = (
  state: Readonly<Model>,
) => Value;

export class State<Model extends object>
  implements Projection<Readonly<Model>> {
  private readonly emitter: Emitter<Readonly<Model>> = new Emitter<
    Readonly<Model>
  >();
  private state: Readonly<Model>;
  private isStateUpdating: boolean = false;
  private pendingResetState: Readonly<Model> | undefined = undefined;
  private pendingPatchState: Readonly<Partial<Model>> | undefined = undefined;

  constructor(defaults?: Readonly<Model>) {
    this.state = Object.assign({}, defaults) as Model;
  }

  get current(): Readonly<Model> {
    return this.state;
  }

  subscribe(subscriber: Consumer<Readonly<Model>>): Subscription {
    return this.emitter.subscribe((state: Model) => subscriber(state));
  }

  reset(state: Readonly<Model>) {
    this.pendingResetState = Object.assign({}, state);
    this.pendingPatchState = undefined;
    this.applyPendingStates();
  }

  update(patch: Partial<Readonly<Model>> | null | undefined) {
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

  getValue<V>(selector: Selector<Model, V>): V {
    return selector(this.state);
  }

  pick<V>(selector: Selector<Model, V>): Projection<V> {
    return createProjection(this, selector);
  }

  private applyPendingStates() {
    if (this.isStateUpdating) {
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
      this.state = nextState;

      this.emitter.emit(this.state);
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

function createProjection<Model extends object, V>(
  state: State<Model>,
  selector: Selector<Model, V>,
): Projection<V> {
  return {
    get current(): V {
      return state.getValue(selector);
    },

    subscribe(subscriber: Consumer<V>): Subscription {
      let currentValue: V;

      return state.subscribe((values: Model) => {
        const value = selector(values);
        if (value !== currentValue) {
          currentValue = value;
          subscriber(value);
        }
      });
    },
  };
}
