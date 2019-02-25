import {Consumer, State, StateValueSelector} from '@jetstate/core';
import {Observable} from 'rxjs';
import {JetProjectionBuilder} from '../jetProjectionBuilder';
import {RxProjection} from './rxProjection';

export class RxState<Model extends object> extends State<Model> {
    pick<V>(selector: StateValueSelector<Model, V>): RxProjection<V> {
        const state = this;
        let value$: Observable<V>;
        let changes$: Observable<V>;

        return {
            get value(): V {
                return state.getValue(selector);
            },

            get value$(): Observable<V> {
                if (!value$) {
                    value$ = new Observable<V>(subscriber => {
                        return this.listen(value => subscriber.next(value));
                    });
                }
                return value$;
            },

            get changes$(): Observable<V> {
                if (!changes$) {
                    changes$ = new Observable<V>(subscriber => {
                        return this.listenChanges(value => subscriber.next(value));
                    });
                }
                return changes$;
            },

            listen(consumer: Consumer<V>) {
                return state.listen(selector, consumer);
            },

            listenChanges(consumer: Consumer<V>) {
                return state.listenChanges(selector, consumer);
            },

            map<T>(mapper: (value: V) => T): RxProjection<T> {
                return JetProjectionBuilder.from<V>(this).build<T>(mapper);
            }
        };
    }

    observe<V>(selector: StateValueSelector<Model, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listen(selector, value => subscriber.next(value));
        });
    }

    observeChanges<V>(selector: StateValueSelector<Model, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listenChanges(selector, value => subscriber.next(value));
        });
    }
}
