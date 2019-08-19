import {Consumer, Projection} from '@jetstate/core';
import {Observable} from 'rxjs';

export interface RxProjection<V> extends Projection<V> {
  readonly current$: Observable<V>;
  readonly changes$: Observable<V>;
}

export function createRxProjection<V>(
  projection: Projection<V>,
): RxProjection<V> {
  let current$: Observable<V>;
  let changes$: Observable<V>;

  return {
    get current(): V {
      return projection.current;
    },

    get current$(): Observable<V> {
      if (!current$) {
        current$ = new Observable<V>(subscriber => {
          subscriber.next(projection.current);
          return projection.listenChanges(value => subscriber.next(value));
        });
      }
      return current$;
    },

    get changes$(): Observable<V> {
      if (!changes$) {
        changes$ = new Observable<V>(subscriber => {
          return projection.listenChanges(value => subscriber.next(value));
        });
      }
      return changes$;
    },

    listenChanges(consumer: Consumer<V>) {
      return projection.listenChanges(consumer);
    },
  };
}
