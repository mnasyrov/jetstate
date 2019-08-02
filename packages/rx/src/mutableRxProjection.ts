import {
  Consumer,
  MutableProjection,
  Projection,
  Subscription,
} from '@jetstate/core';
import {Observable} from 'rxjs';
import {createRxProjection, isRxProjection, RxProjection} from './rxProjection';

export interface MutableRxProjection<V>
  extends MutableProjection<V>,
    RxProjection<V> {
  update(value: V): void;
}

export function createMutableRxProjection<V>(
  projection: Projection<V>,
  onUpdate: (value: V) => any,
): MutableRxProjection<V> {
  const rxProjection = isRxProjection(projection)
    ? projection
    : createRxProjection(projection);
  return new MutableRxProjectionProxy(rxProjection, onUpdate);
}

class MutableRxProjectionProxy<V> implements MutableRxProjection<V> {
  constructor(
    private readonly delegate: RxProjection<V>,
    private readonly onUpdate: (value: V) => any,
  ) {}

  get current(): V {
    return this.delegate.current;
  }

  get current$(): Observable<V> {
    return this.delegate.current$;
  }

  get changes$(): Observable<V> {
    return this.delegate.changes$;
  }

  listenChanges(consumer: Consumer<V>): Subscription {
    return this.delegate.listenChanges(consumer);
  }

  update(value: V) {
    this.onUpdate(value);
  }
}
