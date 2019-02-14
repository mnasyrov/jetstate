import {Projection} from '@jetstate/core';
import {Observable} from 'rxjs';

export interface RxProjection<V> extends Projection<V> {
    select(): Observable<V>;

    selectChanges(): Observable<V>;
}
