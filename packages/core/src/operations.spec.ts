import {merge} from './operations';
import {Query} from './query';
import {Store} from './store';

describe('merge()', () => {
  it('should return a computed value', () => {
    const store1 = new Store({x: 1});
    const store2 = new Store({y: 2});
    const query1 = new Query(store1);
    const query2 = new Query(store2);

    const computed = merge(
      {x: query1.select(it => it.x), y: query2.select(it => it.y)},
      ({x, y}) => x + y,
    );

    expect(computed).toBeDefined();
    expect(computed.value).toEqual(3);
  });

  describe('Merged projection', () => {
    describe('get value()', () => {
      it('should recalculate a value in case a source is changed', () => {
        const store1 = new Store({x: 1});
        const store2 = new Store({y: 2});
        const query1 = new Query(store1);
        const query2 = new Query(store2);

        const computed = merge(
          {x: query1.select(it => it.x), y: query2.select(it => it.y)},
          ({x, y}) => x + y,
        );

        expect(computed.value).toEqual(3);

        store1.update({x: 4});
        expect(computed.value).toEqual(6);

        store2.update({y: 10});
        expect(computed.value).toEqual(14);
      });

      it('should return the last result in case nothing is changed', () => {
        const store1 = new Store({x: 1});
        const store2 = new Store({y: 2});
        const query1 = new Query(store1);
        const query2 = new Query(store2);

        const computed = merge(
          {x: query1.select(it => it.x), y: query2.select(it => it.y)},
          ({x, y}) => {
            return {value: x + y};
          },
        );

        const lastResult = computed.value;
        expect(lastResult).toEqual({value: 3});
        expect(computed.value).toBe(lastResult);
      });
    });
  });
});
