import {MutableProjection} from '@jetstate/core';
import {JetProjection} from './public-api';

export interface MutableJetProjection<V> extends MutableProjection<V>, JetProjection<V> {
    map<T>(mapper: (value: V) => T): JetProjection<T>;

    setValue(value: V): any;
}
