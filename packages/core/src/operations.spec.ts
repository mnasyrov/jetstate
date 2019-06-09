import {computeProjection} from './operations';
import {State} from './state';

describe('mergeProjections()', () => {
  it('should return a computed value', () => {
    const state1 = new State({x: 1});
    const state2 = new State({y: 2});

    const x = state1.map(it => it.x);
    const y = state2.map(it => it.y);
    const computed = computeProjection([x, y], () => x.value + y.value);

    expect(computed).toBeDefined();
    expect(computed.value).toEqual(3);
  });

  describe('Computed projection', () => {
    describe('get value()', () => {
      it('should recalculate a value in case a source is changed', () => {
        const state1 = new State({x: 1});
        const state2 = new State({y: 2});

        const x = state1.map(it => it.x);
        const y = state2.map(it => it.y);
        const computed = computeProjection([x, y], () => x.value + y.value);

        expect(computed.value).toEqual(3);

        state1.update({x: 4});
        expect(computed.value).toEqual(6);

        state2.update({y: 10});
        expect(computed.value).toEqual(14);
      });

      it('should return the last result in case nothing is changed', () => {
        const state1 = new State({x: 1});
        const state2 = new State({y: 2});

        const x = state1.map(it => it.x);
        const y = state2.map(it => it.y);
        const computed = computeProjection([x, y], () => {
          return {value: x.value + y.value};
        });

        const lastResult = computed.value;
        expect(lastResult).toEqual({value: 3});
        expect(computed.value).toBe(lastResult);
      });
    });
  });
});
