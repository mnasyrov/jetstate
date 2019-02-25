import {RxProjection} from './internal/rxProjection';

export interface JetProjection<V> extends RxProjection<V> {
    map<T>(mapper: (value: V) => T): JetProjection<T>;
}
