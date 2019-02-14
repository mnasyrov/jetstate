import {Consumer, State, StateValueSelector} from '@jetstate/core';
import {Observable} from 'rxjs';
import {RxProjection} from './rxProjection';

export class RxState<Model extends object> extends State<Model> {
    pick<V>(selector: StateValueSelector<Model, V>): RxProjection<V> {
        const state = this;
        return {
            getValue(): V {
                return state.getValue(selector);
            },

            listen(consumer: Consumer<V>) {
                return state.listen(selector, consumer);
            },

            listenChanges(consumer: Consumer<V>) {
                return state.listenChanges(selector, consumer);
            },

            select(): Observable<V> {
                return state.select(selector);
            },

            selectChanges(): Observable<V> {
                return state.selectChanges(selector);
            }
        };
    }

    select<V>(selector: StateValueSelector<Model, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listen(selector, value => subscriber.next(value));
        });
    }

    selectChanges<V>(selector: StateValueSelector<Model, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listenChanges(selector, value => subscriber.next(value));
        });
    }
}
