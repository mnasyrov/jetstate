import {Consumer, Subscription} from '@mnasyrov/pubsub';

export interface Projection<V> {
  readonly current: V;

  subscribe(subscriber: Consumer<V>): Subscription;
}
