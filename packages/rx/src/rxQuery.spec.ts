import {Store} from '@jetstate/core';
import {RxQuery} from './rxQuery';

describe('RxQuery', () => {
  describe('method observe()', () => {
    it('should return an observable which passes a current value to each new subscription', async () => {
      const store = new Store<{foo: number}>({foo: 1});
      const query = new RxQuery(store);
      const foo$ = query.select(state => state.foo).current$;

      let subValue1 = -1;
      foo$.subscribe(value => (subValue1 = value));
      expect(subValue1).toBe(1);

      store.update({foo: 2});
      let subValue2 = -1;
      foo$.subscribe(value => (subValue2 = value));
      expect(subValue1).toBe(2);
      expect(subValue2).toBe(2);

      store.update({foo: 3});
      expect(subValue1).toBe(3);
      expect(subValue2).toBe(3);
    });
  });

  describe('method pick()', () => {
    it('should return an observable which passes new changes to each subscription', async () => {
      const store = new Store<{foo: number}>({foo: 1});
      const query = new RxQuery(store);
      const foo$ = query.select(state => state.foo).value$;

      let subValue1 = -1;
      foo$.subscribe(value => (subValue1 = value));
      expect(subValue1).toBe(-1);

      store.update({foo: 2});
      let subValue2 = -1;
      foo$.subscribe(value => (subValue2 = value));
      expect(subValue1).toBe(2);
      expect(subValue2).toBe(-1);

      store.update({foo: 3});
      expect(subValue1).toBe(3);
      expect(subValue2).toBe(3);
    });
  });
});
