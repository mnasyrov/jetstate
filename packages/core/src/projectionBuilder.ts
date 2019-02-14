import {mergeProjections} from './internal/mergeProjections';
import {Projection} from './projection';

export interface ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape;

    build<R>(merger: (...values: any[]) => R): Projection<R>;
}

export interface ProjectionBuilderShapeEmpty extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape1<V>;
}

export interface ProjectionBuilderShape1<V1> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape2<V1, V>;

    build<R>(merger: (v1: V1) => R): Projection<R>;
}

export interface ProjectionBuilderShape2<V1, V2> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape3<V1, V2, V>;

    build<R>(merger: (v1: V1, v2: V2) => R): Projection<R>;
}

export interface ProjectionBuilderShape3<V1, V2, V3> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape4<V1, V2, V3, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3) => R): Projection<R>;
}

export interface ProjectionBuilderShape4<V1, V2, V3, V4> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape5<V1, V2, V3, V4, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4) => R): Projection<R>;
}

export interface ProjectionBuilderShape5<V1, V2, V3, V4, V5> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape6<V1, V2, V3, V4, V5, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5) => R): Projection<R>;
}

export interface ProjectionBuilderShape6<V1, V2, V3, V4, V5, V6> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6) => R): Projection<R>;
}

export interface ProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V7> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7) => R): Projection<R>;
}

export interface ProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V8> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8) => R): Projection<R>;
}

export interface ProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V9> extends ProjectionBuilderShape {
    from<V>(source: Projection<V>): ProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V>;

    build<R>(merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8, v9: V9) => R): Projection<R>;
}

export interface ProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10> extends ProjectionBuilderShape {
    build<R>(
        merger: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5, v6: V6, v7: V7, v8: V8, v9: V9, v10: V10) => R
    ): Projection<R>;
}

export class ProjectionBuilder implements ProjectionBuilderShape {
    static from(): ProjectionBuilderShapeEmpty;
    static from<V1>(s1: Projection<V1>): ProjectionBuilderShape1<V1>;
    static from<V1, V2>(s1: Projection<V1>, s2: Projection<V2>): ProjectionBuilderShape2<V1, V2>;
    static from<V1, V2, V3>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>
    ): ProjectionBuilderShape3<V1, V2, V3>;
    static from<V1, V2, V3, V4>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>
    ): ProjectionBuilderShape4<V1, V2, V3, V4>;
    static from<V1, V2, V3, V4, V5>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>
    ): ProjectionBuilderShape5<V1, V2, V3, V4, V5>;
    static from<V1, V2, V3, V4, V5, V6>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>
    ): ProjectionBuilderShape6<V1, V2, V3, V4, V5, V6>;
    static from<V1, V2, V3, V4, V5, V6, V7>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>
    ): ProjectionBuilderShape7<V1, V2, V3, V4, V5, V6, V7>;
    static from<V1, V2, V3, V4, V5, V6, V7, V8>(
        s1: Projection<V1>,
        s2: Projection<V2>,
        s3: Projection<V3>,
        s4: Projection<V4>,
        s5: Projection<V5>,
        s6: Projection<V6>,
        s7: Projection<V7>,
        s8: Projection<V8>
    ): ProjectionBuilderShape8<V1, V2, V3, V4, V5, V6, V7, V8>;
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
    ): ProjectionBuilderShape9<V1, V2, V3, V4, V5, V6, V7, V8, V9>;
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
    ): ProjectionBuilderShape10<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>;
    static from(...sources: Projection<any>[]): ProjectionBuilderShape;
    static from(...sources: Projection<any>[]): ProjectionBuilderShape {
        return new ProjectionBuilder(...sources);
    }

    private readonly sources: Projection<any>[];

    private constructor(...sources: Projection<any>[]) {
        this.sources = sources;
    }

    from<V>(source: Projection<V>): ProjectionBuilderShape {
        const sources = [...this.sources, source];
        return ProjectionBuilder.from(...sources);
    }

    build<R>(merger: (...values: any[]) => R): Projection<R> {
        return mergeProjections<R>(merger, ...this.sources);
    }
}
