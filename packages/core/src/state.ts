import {createMutableProjection, MutableProjection} from './mutableProjection';
import {Projection} from './projection';
import {Consumer, Emitter, Subscription} from './pubsub';
import {Selector} from './selector';

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

  get value(): Readonly<Model> {
    return this.state;
  }

  listenChanges(consumer: Consumer<Readonly<Model>>): Subscription {
    return this.emitter.subscribe((state: Model) => consumer(state));
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

  map<V>(selector: Selector<Model, V>): Projection<V> {
    const state = this;
    return {
      get value(): V {
        return state.select(selector);
      },

      listenChanges(consumer: Consumer<V>) {
        return state.selectChanges(selector, consumer);
      },
    };
  }

  /** @experimental */
  mapMutable<V>(
    selector: Selector<Model, V>,
    patcher: (value: V) => Partial<Model>,
  ): MutableProjection<V> {
    return createMutableProjection(this.map(selector), value =>
      this.update(patcher(value)),
    );
  }

  select<V>(selector: Selector<Model, V>): V {
    return selector(this.state);
  }

  selectChanges<V>(
    selector: Selector<Model, V>,
    consumer: Consumer<V>,
  ): Subscription {
    let currentValue: V;

    const subscription = this.emitter.subscribe((state: Model) => {
      const value = selector(state);
      if (value !== currentValue) {
        currentValue = value;
        consumer(value);
      }
    });

    return subscription;
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
