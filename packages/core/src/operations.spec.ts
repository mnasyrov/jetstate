import {merge} from './operations';
import {State} from './state';

describe('merge()', () => {
  it('should return a computed value', () => {
    const state1 = new State({x: 1});
    const state2 = new State({y: 2});

    const computed = merge(
      {x: state1.pick(it => it.x), y: state2.pick(it => it.y)},
      ({x, y}) => x + y,
    );

    expect(computed).toBeDefined();
    expect(computed.current).toEqual(3);
  });

  describe('Merged projection', () => {
    describe('get value()', () => {
      it('should recalculate a value in case a source is changed', () => {
        const state1 = new State({x: 1});
        const state2 = new State({y: 2});

        const computed = merge(
          {x: state1.pick(it => it.x), y: state2.pick(it => it.y)},
          ({x, y}) => x + y,
        );

        expect(computed.current).toEqual(3);

        state1.update({x: 4});
        expect(computed.current).toEqual(6);

        state2.update({y: 10});
        expect(computed.current).toEqual(14);
      });

      it('should return the last result in case nothing is changed', () => {
        const state1 = new State({x: 1});
        const state2 = new State({y: 2});

        const computed = merge(
          {x: state1.pick(it => it.x), y: state2.pick(it => it.y)},
          ({x, y}) => {
            return {value: x + y};
          },
        );

        const lastResult = computed.current;
        expect(lastResult).toEqual({value: 3});
        expect(computed.current).toBe(lastResult);
      });
    });
  });
});
