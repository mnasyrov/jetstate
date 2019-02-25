import {Projection} from './projection';
import {ProjectionBuilder} from './projectionBuilder';
import {State} from './state';

describe('ProjectionBuilder', () => {
    describe('factory methods from(...).build(...)', () => {
        it('should return a computed value', () => {
            const state1 = new State({x: 1});
            const state2 = new State({y: 2});

            const computed = ProjectionBuilder.from(state1.pick(it => it.x), state2.pick(it => it.y)).build(
                (x, y) => x + y
            );

            expect(computed).toBeDefined();
            expect(computed.value).toEqual(3);
        });

        it('should keeps type information in case the `from()` is called without arguments', () => {
            const state1 = new State({x: 1});
            const state2 = new State({y: 2});

            const computed = ProjectionBuilder.from()
                .from(state1.pick(it => it.x))
                .from(state2.pick(it => it.y))
                .build((x, y) => x + y);

            expect(computed).toBeDefined();
            expect(computed.value).toEqual(3);
        });
    });

    describe('Computed projection', () => {
        describe('getter value()', () => {
            it('should recalculate a value in case a source is changed', () => {
                const state1 = new State({x: 1});
                const state2 = new State({y: 2});
                const computed = ProjectionBuilder.from(state1.pick(it => it.x), state2.pick(it => it.y)).build(
                    (x, y) => x + y
                );
                expect(computed.value).toEqual(3);

                state1.patch({x: 4});
                expect(computed.value).toEqual(6);

                state2.patch({y: 10});
                expect(computed.value).toEqual(14);
            });

            it('should return the last result in case nothing is changed', () => {
                const state1 = new State({x: 1});
                const state2 = new State({y: 2});

                const computed: Projection<{value: number}> = ProjectionBuilder.from(state1.pick(it => it.x))
                    .from(state2.pick(it => it.y))
                    .build((x, y) => ({value: x + y}));

                const lastResult = computed.value;
                expect(lastResult).toEqual({value: 3});
                expect(computed.value).toBe(lastResult);
            });
        });
    });
});
