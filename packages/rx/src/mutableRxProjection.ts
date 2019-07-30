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
  setValue(value: V): void;
}

export function createMutableRxProjection<V>(
  projection: Projection<V>,
  setter: (value: V) => any,
): MutableRxProjection<V> {
  const rxProjection = isRxProjection(projection)
    ? projection
    : createRxProjection(projection);
  return new MutableRxProjectionProxy(rxProjection, setter);
}

class MutableRxProjectionProxy<V> implements MutableRxProjection<V> {
  constructor(
    private readonly delegate: RxProjection<V>,
    private readonly setter: (value: V) => any,
  ) {}

  get value(): V {
    return this.delegate.value;
  }

  get value$(): Observable<V> {
    return this.delegate.value$;
  }

  get changes$(): Observable<V> {
    return this.delegate.changes$;
  }

  listenChanges(consumer: Consumer<V>): Subscription {
    return this.delegate.listenChanges(consumer);
  }

  setValue(value: V) {
    this.setter(value);
  }
}
