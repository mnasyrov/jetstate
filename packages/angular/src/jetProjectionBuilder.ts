import {Consumer, Projection, ProjectionBuilder, Subscription} from '@jetstate/core';
import {Observable} from 'rxjs';
import {JetProjection} from './jetProjection';

export interface JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape;

    build<R>(merger: (...values: any[]) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape1<V1> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape2<V1, V>;

    build<R>(merger: (v1: V1) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape2<V1, V2> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape3<V1, V2, V>;

    build<R>(merger: (v1: V1, v2: V2) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape3<V1, V2, V3> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape4<V1, V2, V3, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape4<V1, V2, V3, V4> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape5<V1, V2, V3, V4, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape5<V1, V2, V3, V4, V5> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape6<V1, V2, V3, V4, V5, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape6<V1, V2, V3, V4, V5, V6> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V7> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V8> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V9> extends JetProjectionBuilderShape {
    from<V>(source: Projection<V>): JetProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8, v9: V9) => R): JetProjection<R>;
}

export interface JetProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>
    extends JetProjectionBuilderShape {
    build<R>(
        merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8, v9: V9, v10: V10) => R
    ): JetProjection<R>;
}

export class JetProjectionBuilder implements JetProjectionBuilderShape {
    static from<V1>(s1: Projection<V1>): JetProjectionBuilderShape1<V1>;
    static from<V1, V2>(s1: Projection<V1>, s2: Projection<V2>): JetProjectionBuilderShape2<V1, V2>;
    static from<V1, V2, V3>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>
    ): JetProjectionBuilderShape3<V1, V2, V3>;
    static from<V1, V2, V3, V4>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>
    ): JetProjectionBuilderShape4<V1, V2, V3, V4>;
    static from<V1, V2, V3, V4, V5>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>
    ): JetProjectionBuilderShape5<V1, V2, V3, V4, V5>;
    static from<V1, V2, V3, V4, V5, V6>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>
    ): JetProjectionBuilderShape6<V1, V2, V3, V4, V5, V6>;
    static from<V1, V2, V3, V4, V5, V6, V7>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>
    ): JetProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V7>;
    static from<V1, V2, V3, V4, V5, V6, V7, V8>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>,
        s8: Projection<V8>
    ): JetProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V8>;
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
    ): JetProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V9>;
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
    ): JetProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>;
    static from(...sources: Projection<any>[]): JetProjectionBuilderShape;
    static from(...sources: Projection<any>[]): JetProjectionBuilderShape {
        return new JetProjectionBuilder(...sources);
    }

    private readonly sources: Projection<any>[];

    private constructor(...sources: Projection<any>[]) {
        this.sources = sources;
    }

    from<V>(source: Projection<V>): JetProjectionBuilderShape {
        const sources = [...this.sources, source];
        return JetProjectionBuilder.from(...sources);
    }

    build<R>(merger: (...values: any[]) => R): JetProjection<R> {
        const projection: Projection<R> = ProjectionBuilder.from(...this.sources).build(merger);
        return {
            getValue(): R {
                return projection.getValue();
            },

            listen(consumer: Consumer<R>): Subscription {
                return projection.listen(consumer);
            },

            listenChanges(consumer: Consumer<R>): Subscription {
                return projection.listenChanges(consumer);
            },

            select(): Observable<R> {
                return new Observable<R>(subscriber => {
                    return this.listen(value => subscriber.next(value));
                });
            },

            selectChanges(): Observable<R> {
                return new Observable<R>(subscriber => {
                    return this.listenChanges(value => subscriber.next(value));
                });
            }
        };
    }
}
