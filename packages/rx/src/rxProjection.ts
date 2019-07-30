import {Consumer, Projection} from '@jetstate/core';
import {Observable} from 'rxjs';

export interface RxProjection<V> extends Projection<V> {
  readonly value$: Observable<V>;
  readonly changes$: Observable<V>;
}

export function isRxProjection<V>(
  projection: Projection<V>,
): projection is RxProjection<V> {
  return 'value$' in projection && 'changes$' in projection;
}

export function createRxProjection<V>(
  projection: Projection<V>,
): RxProjection<V> {
  let value$: Observable<V>;
  let changes$: Observable<V>;

  return {
    get value(): V {
      return projection.value;
    },

    get value$(): Observable<V> {
      if (!value$) {
        value$ = new Observable<V>(subscriber => {
          subscriber.next(projection.value);
          return projection.listenChanges(value => subscriber.next(value));
        });
      }
      return value$;
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
