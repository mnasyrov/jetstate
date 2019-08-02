import {Projection} from './projection';
import {Consumer, Subscription} from './pubsub';

export interface MutableProjection<V> extends Projection<V> {
  update(value: V): void;
}

export function createMutableProjection<V>(
  projection: Projection<V>,
  onUpdate: (value: V) => any,
): MutableProjection<V> {
  return new MutableProjectionProxy(projection, onUpdate);
}

class MutableProjectionProxy<V> implements MutableProjection<V> {
  constructor(
    private readonly delegate: Projection<V>,
    private readonly onUpdate: (value: V) => any,
  ) {}

  get current(): V {
    return this.delegate.current;
  }

  listenChanges(consumer: Consumer<V>): Subscription {
    return this.delegate.listenChanges(consumer);
  }

  update(value: V) {
    this.onUpdate(value);
  }
}
