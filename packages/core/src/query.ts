import {defer, Observable} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {Store} from './store';

export type Selector<State extends object, V> = (state: Readonly<State>) => V;

/** Returns an observable which pushes the current value first. */
export function select<State extends object, V>(
  store: Store<State>,
  selector: Selector<State, V>,
): Observable<V> {
  return defer(() => {
    const currentValue = selector(store.state);
    return store.state$.pipe(
      map(selector),
      startWith<V, V>(currentValue),
      distinctUntilChanged(),
    );
  });
}

export interface Projection<V> {
  readonly value: V;
  readonly value$: Observable<V>;
}

export function project<State extends object, V>(
  store: Store<State>,
  selector: Selector<State, V>,
): Projection<V> {
  return {
    get value() {
      return selector(store.state);
    },
    value$: select(store, selector),
  };
}

export function createQuery<State extends object>(store: Store<State>) {
  return new Query<State>(store);
}

export class Query<State extends object> {
  constructor(private store: Store<State>) {}

  get state(): Readonly<Readonly<State>> {
    return this.store.state;
  }

  /** Returns an observable which pushes the current value first. */
  select<V>(selector: Selector<State, V>): Observable<V> {
    return select(this.store, selector);
  }

  project<V>(selector: Selector<State, V>): Projection<V> {
    return project(this.store, selector);
  }
}
