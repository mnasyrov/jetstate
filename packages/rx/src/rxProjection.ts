import {Projection} from '@jetstate/core';
import {defer, Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';

export interface RxProjection<V> extends Projection<V> {
  readonly value$: Observable<V>;
  readonly current$: Observable<V>;
}

export function createRxProjection<V>(
  projection: Projection<V>,
): RxProjection<V> {
  const value$: Observable<V> = new Observable<V>(subscriber => {
    return projection.subscribe(value => subscriber.next(value));
  });

  return {
    get value(): V {
      return projection.value;
    },

    subscribe(consumer: (value: V) => any) {
      return projection.subscribe(consumer);
    },

    value$,

    get current$(): Observable<V> {
      return defer(() => value$.pipe(startWith<V, V>(projection.value)));
    },
  };
}
