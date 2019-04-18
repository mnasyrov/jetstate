import {Consumer, State, StateValueSelector} from '@jetstate/core';
import {Observable} from 'rxjs';
import {MutableRxProjectionProxy} from './internal/mutableRxProjectionProxy';
import {MutableRxProjection} from './mutableRxProjection';
import {RxProjection} from './rxProjection';
import {RxProjectionBuilder} from './rxProjectionBuilder';

export class RxState<Model extends object> extends State<Model> {
    static readonly compute = RxProjectionBuilder.from;

    static mutable<V>(projection: RxProjection<V>, setter: (value: V) => any): MutableRxProjection<V> {
        return new MutableRxProjectionProxy(projection, setter);
    }

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
                return RxProjectionBuilder.from<V>(this).build<T>(mapper);
            }
        };
    }

    pickMutable<V>(
        selector: StateValueSelector<Model, V>,
        patcher: (value: V) => Partial<Model> | undefined | void
    ): MutableRxProjection<V> {
        const projection = this.pick(selector);
        return new MutableRxProjectionProxy(projection, (value: V) => {
            const newState = patcher(value);
            if (newState) {
                this.patch(newState);
            }
        });
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
