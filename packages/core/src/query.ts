import {defer, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Store} from './store';

export type Selector<State extends object, V> = (state: Readonly<State>) => V;

/** Returns an observable which pushes the current value first. */
export function select<State extends object, V>(
  store: Store<State>,
  selector: Selector<State, V>,
): Observable<V> {
  return defer(() => {
    return store.state$.pipe(map(selector), distinctUntilChanged());
  });
}

export interface Projection<V> {
  /** A current value */
  readonly value: V;

  /** An observable which pushes the current value first. */
  readonly value$: Observable<V>;

  /** An observable for value changes. */
  readonly changes$: Observable<V>;
}

export function project<State extends object, V>(
  store: Store<State>,
  selector: Selector<State, V>,
): Projection<V> {
  let value$: Observable<V>;
  let changes$: Observable<V>;

  return {
    get value() {
      return selector(store.state);
    },
    get value$() {
      if (!value$) {
        value$ = select(store, selector);
      }
      return value$;
    },
    get changes$() {
      if (!changes$) {
        changes$ = store.changes$.pipe(map(selector), distinctUntilChanged());
      }
      return changes$;
    },
  };
}

export function createQuery<State extends object>(
  store: Store<State>,
): Query<State> {
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

  /** Returns a subset of a state. */
  project<V>(selector: Selector<State, V>): Projection<V> {
    return project(this.store, selector);
  }
}
