import {Consumer} from './pubsub/consumer';
import {Subscription} from './pubsub/subscription';

export interface Projection<V> {
    getValue(): V;

    listen(consumer: Consumer<V>): Subscription;

    listenChanges(consumer: Consumer<V>): Subscription;
}
