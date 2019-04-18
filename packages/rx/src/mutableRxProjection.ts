import {MutableProjection} from '@jetstate/core';
import {RxProjection} from './rxProjection';

export interface MutableRxProjection<V> extends MutableProjection<V>, RxProjection<V> {
    map<T>(mapper: (value: V) => T): RxProjection<T>;

    setValue(value: V): any;
}
