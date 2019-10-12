import {Consumer, Subscription} from '@mnasyrov/pubsub';

export interface Projection<V> {
  readonly value: V;

  subscribe(subscriber: Consumer<V>): Subscription;
}
