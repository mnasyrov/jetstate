import {Projection} from './projection';
import {Consumer, Subscription} from './pubsub';

export interface MutableProjection<V> extends Projection<V> {
  setValue(value: V): void;
}

export function createMutableProjection<V>(
  projection: Projection<V>,
  setter: (value: V) => any
): MutableProjection<V> {
  return new MutableProjectionProxy(projection, setter);
}

class MutableProjectionProxy<V> implements MutableProjection<V> {
  constructor(
    private readonly delegate: Projection<V>,
    private readonly setter: (value: V) => any
  ) {}

  get value(): V {
    return this.delegate.value;
  }

  listenChanges(consumer: Consumer<V>): Subscription {
    return this.delegate.listenChanges(consumer);
  }

  setValue(value: V) {
    this.setter(value);
  }
}
