import {RxState} from './rxState';

describe('RxState', () => {
  describe('method observe()', () => {
    it('should return an observable which passes a current value to each new subscription', async () => {
      const state = new RxState<{foo: number}>();
      state.reset({foo: 1});
      const foo$ = state.pick(it => it.foo).current$;

      let subValue1 = -1;
      foo$.subscribe(value => (subValue1 = value));
      expect(subValue1).toBe(1);

      state.update({foo: 2});
      let subValue2 = -1;
      foo$.subscribe(value => (subValue2 = value));
      expect(subValue1).toBe(2);
      expect(subValue2).toBe(2);

      state.update({foo: 3});
      expect(subValue1).toBe(3);
      expect(subValue2).toBe(3);
    });
  });

  describe('method pick()', () => {
    it('should return an observable which passes new changes to each subscription', async () => {
      const state = new RxState<{foo: number}>();
      state.reset({foo: 1});
      const foo$ = state.pick(it => it.foo).changes$;

      let subValue1 = -1;
      foo$.subscribe(value => (subValue1 = value));
      expect(subValue1).toBe(-1);

      state.update({foo: 2});
      let subValue2 = -1;
      foo$.subscribe(value => (subValue2 = value));
      expect(subValue1).toBe(2);
      expect(subValue2).toBe(-1);

      state.update({foo: 3});
      expect(subValue1).toBe(3);
      expect(subValue2).toBe(3);
    });
  });
});
