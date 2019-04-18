import {Projection} from '@jetstate/core';
import {Observable} from 'rxjs';

export interface RxProjection<V> extends Projection<V> {
    readonly value$: Observable<V>;
    readonly changes$: Observable<V>;

    map<T>(mapper: (value: V) => T): RxProjection<T>;
}
