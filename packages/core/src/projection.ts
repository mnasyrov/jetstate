import {Consumer, Subscription} from './pubsub';

export interface Projection<V> {
  readonly value: V;

  listenChanges(consumer: Consumer<V>): Subscription;
}
