import {Consumer, Subscription} from '@jetstate/core';
import {Observable} from 'rxjs';
import {JetProjection} from '../jetProjection';
import {MutableJetProjection} from '../public-api';

export class MutableJetProjectionProxy<V, R> implements MutableJetProjection<V> {
    constructor(private readonly delegate: JetProjection<V>, private readonly setter: (value: V) => R) {}

    get value(): V {
        return this.delegate.value;
    }

    get value$(): Observable<V> {
        return this.delegate.value$;
    }

    get changes$(): Observable<V> {
        return this.delegate.changes$;
    }

    listen(consumer: Consumer<V>): Subscription {
        return this.delegate.listen(consumer);
    }

    listenChanges(consumer: Consumer<V>): Subscription {
        return this.delegate.listenChanges(consumer);
    }

    map<T>(mapper: (value: V) => T): JetProjection<T> {
        return this.delegate.map<T>(mapper);
    }

    setValue(value: V): R {
        return this.setter(value);
    }
}
