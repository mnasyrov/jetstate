import {Consumer, Subscription} from './pubsub';

export interface Projection<V> {
  readonly current: V;

  listenChanges(consumer: Consumer<V>): Subscription;
}
