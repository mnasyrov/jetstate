import {Consumer, MutableProjection, Projection, Subscription} from '../public-api';

export class MutableProjectionProxy<V, R> implements MutableProjection<V> {
    constructor(private readonly delegate: Projection<V>,
                private readonly setter: (value: V) => R) {
    }

    get value(): V {
        return this.delegate.value;
    }

    listen(consumer: Consumer<V>): Subscription {
        return this.delegate.listen(consumer);
    }

    listenChanges(consumer: Consumer<V>): Subscription {
        return this.delegate.listenChanges(consumer);
    }

    map<T>(mapper: (value: V) => T): Projection<T> {
        return this.delegate.map<T>(mapper);
    }

    setValue(value: V): R {
        return this.setter(value);
    }
}
