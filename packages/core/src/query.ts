import {Consumer, Subscription} from '@mnasyrov/pubsub';
import {Projection} from './projection';
import {Store} from './store';

export type Selector<State extends object, Value> = (
  state: Readonly<State>,
) => Value;

export class Query<State extends object> {
  constructor(protected store: Store<State>) {}

  get state(): Readonly<State> {
    return this.store.value;
  }

  select<V>(selector: Selector<State, V>): Projection<V> {
    return createProjection(this.store, selector);
  }

  selectValue<V>(selector: Selector<State, V>): V {
    return selector(this.store.value);
  }
}

export function createProjection<State extends object, V>(
  store: Store<State>,
  selector: Selector<State, V>,
): Projection<V> {
  return {
    get value(): V {
      return selector(store.value);
    },

    subscribe(subscriber: Consumer<V>): Subscription {
      let currentValue: V;

      return store.subscribe((values: State) => {
        const value = selector(values);
        if (value !== currentValue) {
          currentValue = value;
          subscriber(value);
        }
      });
    },
  };
}
