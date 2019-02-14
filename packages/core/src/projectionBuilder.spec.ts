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
            expect(computed.getValue()).toEqual(3);
        });
    });

    describe('Computed projection', () => {
        describe('method getValue()', () => {
            it('should recalculate a value in case a source is changed', () => {
                const state1 = new State({x: 1});
                const state2 = new State({y: 2});
                const computed = ProjectionBuilder.from(state1.pick(it => it.x), state2.pick(it => it.y)).build(
                    (x, y) => x + y
                );
                expect(computed.getValue()).toEqual(3);

                state1.patch({x: 4});
                expect(computed.getValue()).toEqual(6);

                state2.patch({y: 10});
                expect(computed.getValue()).toEqual(14);
            });

            it('should return the last result in case nothing is changed', () => {
                const state1 = new State({x: 1});
                const state2 = new State({y: 2});

                const computed: Projection<{value: number}> = ProjectionBuilder.from(state1.pick(it => it.x))
                    .from(state2.pick(it => it.y))
                    .build((x, y) => ({value: x + y}));

                const lastResult = computed.getValue();
                expect(lastResult).toEqual({value: 3});
                expect(computed.getValue()).toBe(lastResult);
            });
        });
    });
});
