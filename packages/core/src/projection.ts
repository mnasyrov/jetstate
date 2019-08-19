import {Consumer, Subscription} from './pubsub';

export interface Projection<V> {
  readonly current: V;

  subscribe(subscriber: Consumer<V>): Subscription;
}
