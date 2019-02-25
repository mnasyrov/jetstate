import {Projection} from './projection';

export interface MutableProjection<V> extends Projection<V> {
    setValue(value: V): any;
}
