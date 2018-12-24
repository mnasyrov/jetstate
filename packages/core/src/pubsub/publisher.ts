import {Consumer} from './consumer';
import {Subscription} from './subscription';

export interface Publisher<T> {
    subscribe(consumer: Consumer<T>): Subscription;
}
