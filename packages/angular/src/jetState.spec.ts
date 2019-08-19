import {JetState} from './jetState';

describe('JetState', () => {
  describe('method observe()', () => {
    it('should return an observable which passes a current value to each new subscription', async () => {
      const state = new JetState<{foo: number}>();
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

  describe('method selectChanges()', () => {
    it('should return an observable which passes new changes to each subscription', async () => {
      const state = new JetState<{foo: number}>();
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

  describe('static method create()', () => {
    it('should return a new instance of JetState', () => {
      const state = new JetState();
      expect(state).toBeDefined();
    });

    it('should set default values to the state', () => {
      const state = new JetState({foo: 1, bar: 'hello'});
      expect(state.getValue(it => it.foo)).toBe(1);
      expect(state.getValue(it => it.bar)).toBe('hello');
    });
  });
});
