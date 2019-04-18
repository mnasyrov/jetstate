import {Consumer, Projection, ProjectionBuilder, Subscription} from '@jetstate/core';
import {Observable} from 'rxjs';
import {RxProjection} from './rxProjection';

export interface RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape;

    build<R>(merger: (...values: any[]) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShapeEmpty extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape1<V>;
}

export interface RxProjectionBuilderShape1<V1> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape2<V1, V>;

    build<R>(merger: (v1: V1) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape2<V1, V2> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape3<V1, V2, V>;

    build<R>(merger: (v1: V1, v2: V2) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape3<V1, V2, V3> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape4<V1, V2, V3, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape4<V1, V2, V3, V4> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape5<V1, V2, V3, V4, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape5<V1, V2, V3, V4, V5> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape6<V1, V2, V3, V4, V5, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape6<V1, V2, V3, V4, V5, V6> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V7> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V8> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V9> extends RxProjectionBuilderShape {
    from<V>(source: Projection<V>): RxProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8, v9: V9) => R): RxProjection<R>;
}

export interface RxProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10> extends RxProjectionBuilderShape {
    build<R>(
        merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8, v9: V9, v10: V10) => R
    ): RxProjection<R>;
}

export class RxProjectionBuilder implements RxProjectionBuilderShape {
    static from(): RxProjectionBuilderShapeEmpty;
    static from<V1>(s1: Projection<V1>): RxProjectionBuilderShape1<V1>;
    static from<V1, V2>(s1: Projection<V1>, s2: Projection<V2>): RxProjectionBuilderShape2<V1, V2>;
    static from<V1, V2, V3>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>
    ): RxProjectionBuilderShape3<V1, V2, V3>;
    static from<V1, V2, V3, V4>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>
    ): RxProjectionBuilderShape4<V1, V2, V3, V4>;
    static from<V1, V2, V3, V4, V5>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>
    ): RxProjectionBuilderShape5<V1, V2, V3, V4, V5>;
    static from<V1, V2, V3, V4, V5, V6>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>
    ): RxProjectionBuilderShape6<V1, V2, V3, V4, V5, V6>;
    static from<V1, V2, V3, V4, V5, V6, V7>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>
    ): RxProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V7>;
    static from<V1, V2, V3, V4, V5, V6, V7, V8>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>,
        s8: Projection<V8>
    ): RxProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V8>;
    static from<V1, V2, V3, V4, V5, V6, V7, V8, V9>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>,
        s8: Projection<V8>,
        s9: Projection<V9>
    ): RxProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V9>;
    static from<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>,
        s8: Projection<V8>,
        s9: Projection<V9>,
        s10: Projection<V10>
    ): RxProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>;
    static from(...sources: Projection<any>[]): RxProjectionBuilderShape;
    static from(...sources: Projection<any>[]): RxProjectionBuilderShape {
        return new RxProjectionBuilder(...sources);
    }

    private readonly sources: Projection<any>[];

    private constructor(...sources: Projection<any>[]) {
        this.sources = sources;
    }

    from<V>(source: Projection<V>): RxProjectionBuilderShape {
        const sources = [...this.sources, source];
        return RxProjectionBuilder.from(...sources);
    }

    build<R>(merger: (...values: any[]) => R): RxProjection<R> {
        const projection: Projection<R> = ProjectionBuilder.from(...this.sources).build(merger);
        let value$: Observable<R>;
        let changes$: Observable<R>;

        return {
            get value(): R {
                return projection.value;
            },

            get value$(): Observable<R> {
                if (!value$) {
                    value$ = new Observable<R>(subscriber => {
                        return this.listen(value => subscriber.next(value));
                    });
                }
                return value$;
            },

            get changes$(): Observable<R> {
                if (!changes$) {
                    changes$ = new Observable<R>(subscriber => {
                        return this.listenChanges(value => subscriber.next(value));
                    });
                }
                return changes$;
            },

            listen(consumer: Consumer<R>): Subscription {
                return projection.listen(consumer);
            },

            listenChanges(consumer: Consumer<R>): Subscription {
                return projection.listenChanges(consumer);
            },

            map<T>(mapper: (value: R) => T): RxProjection<T> {
                return RxProjectionBuilder.from<R>(this).build<T>(mapper);
            }
        };
    }
}
