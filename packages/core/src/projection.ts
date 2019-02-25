import {Consumer} from './pubsub/consumer';
import {Subscription} from './pubsub/subscription';

export interface Projection<V> {
    readonly value: V;

    listen(consumer: Consumer<V>): Subscription;

    listenChanges(consumer: Consumer<V>): Subscription;

    map<T>(mapper: (value: V) => T): Projection<T>;
}
