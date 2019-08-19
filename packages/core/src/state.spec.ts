import {State} from './state';

describe('State', () => {
  describe('getter current()', () => {
    it('should return a defined state', () => {
      const state = new State();
      expect(state.current).toBeTruthy();
    });

    it('should return a state', () => {
      const defaults = {foo: 'bar'};
      const state = new State(defaults);
      expect(state.current).toEqual(defaults);
    });

    it('a state must not be equal to defaults', () => {
      const defaults = {foo: 'bar'};
      const state = new State(defaults);
      expect(state.current).not.toBe(defaults);
    });
  });

  describe('method reset()', () => {
    it('should reset to a new state', () => {
      const state = new State({foo: 'bar', xyz: 0});
      state.reset({foo: 'baz', xyz: 1});
      expect(state.current).toEqual({foo: 'baz', xyz: 1});
    });

    it('should reset in case of a partial new state ', () => {
      const state = new State({foo: 'bar', xyz: 0});
      state.reset({foo: 'baz', xyz: 1});
      state.reset({foo: 'abc'} as any);
      expect(state.current).toEqual({foo: 'abc'});
    });

    it('should reset in case a current state has an extra field', () => {
      const state = new State({foo: 'bar', xyz: 0});
      state.update({extraField: 1} as any);
      state.reset({foo: 'abc'} as any);
      expect(state.current).toEqual({foo: 'abc'});
    });
  });

  describe('method update()', () => {
    it('should update a whole state', () => {
      const state = new State({foo: 'bar', xyz: 0});
      state.update({foo: 'baz', xyz: 1});
      expect(state.current).toEqual({foo: 'baz', xyz: 1});
    });

    it('should update a partial state', () => {
      const state = new State({foo: 'bar', xyz: 0});
      state.update({foo: 'baz'});
      expect(state.current).toEqual({foo: 'baz', xyz: 0});
    });

    it('should not modify anything in case a new state is null or undefined', () => {
      const state = new State({foo: 'bar'});
      const expectedState = state.current;

      state.update(null as any);
      expect(state.current).toBe(expectedState);

      state.update(undefined as any);
      expect(state.current).toBe(expectedState);
    });
  });

  describe('method pick().subscribe()', () => {
    it('should attach a listener for changes of a selected state value', () => {
      const state = new State({foo: 1});
      const changes: number[] = [];
      state.pick(it => it.foo).subscribe(value => changes.push(value));
      state.update({foo: 2});
      expect(changes).toEqual([2]);
    });

    it('should return a subscription for the attached listener', () => {
      const state = new State({foo: 1});
      const subscription = state
        .pick(() => undefined)
        .subscribe(() => undefined);
      expect(subscription).toBeDefined();
    });

    it('should return a subscription the listener which allow to unsubscribe it', () => {
      const state = new State({foo: 1});
      const changes: number[] = [];
      const subscription = state
        .pick(it => it.foo)
        .subscribe(value => changes.push(value));
      state.update({foo: 2});
      state.update({foo: 3});
      subscription.unsubscribe();
      state.update({foo: 4});
      expect(changes).toEqual([2, 3]);
    });
  });

  describe('triggering value listeners with a new state by patch() and reset() methods', () => {
    it('should trigger a listener in case a selected value was changed', () => {
      const state = new State({foo: 1, bar: 0});
      const changes: number[] = [];
      state.pick(it => it.foo).subscribe(value => changes.push(value));
      state.update({foo: 1});
      state.update({foo: 2});
      state.update({bar: 42});
      state.update({foo: 2});
      state.update({foo: 3});
      expect(changes).toEqual([1, 2, 3]);
    });

    it('should keeps pending state patches during applying a current state updates', () => {
      const state = new State({x: 0, y: 0, z: 0});
      const changes: number[] = [];
      state.pick(it => it.x).subscribe(x => state.update({y: x * x}));
      state.pick(it => it.y).subscribe(y => state.update({z: y * 10}));
      state.pick(it => it.z).subscribe(z => changes.push(z));
      state.update({x: 1});
      state.update({x: 2});
      state.update({x: 3});
      expect(changes).toEqual([0, 10, 40, 90]);
    });

    it('should keeps pending state resets during applying a current state updates', () => {
      const state = new State({x: 0, y: 0, z: 0});
      const changes: number[] = [];
      state
        .pick(it => it.x)
        .subscribe(x => {
          state.reset({x: 1, y: x * x, z: 0});
          state.update({z: x * x * 10});
        });
      state.pick(it => it.z).subscribe(z => changes.push(z));
      state.update({x: 1});
      state.update({x: 2});
      state.update({x: 3});
      expect(changes).toEqual([0, 10, 40, 10, 90, 10]);
    });
  });

  describe('triggering value change listener with a new state by patch() and reset() methods', () => {
    it('should trigger a change listener in case a selected value was changed', () => {
      const state = new State({foo: 1, bar: 0});
      const changes: number[] = [];
      state.pick(it => it.foo).subscribe(value => changes.push(value));
      state.update({foo: 2});
      state.update({bar: 42});
      state.update({foo: 2});
      state.update({foo: 3});
      expect(changes).toEqual([2, 3]);
    });

    it('should keeps pending state patches during applying a current state updates', () => {
      const state = new State({x: 1, y: 0, z: 0});
      const changes: number[] = [];
      state.pick(it => it.x).subscribe(x => state.update({y: x * x}));
      state.pick(it => it.y).subscribe(y => state.update({z: y * 10}));
      state.pick(it => it.z).subscribe(z => changes.push(z));
      state.update({x: 2});
      state.update({x: 3});
      expect(changes).toEqual([0, 40, 90]);
    });

    it('should keeps pending state resets during applying a current state updates', () => {
      const state = new State({x: 1, y: 0, z: 0});
      const changes: number[] = [];
      state
        .pick(it => it.x)
        .subscribe(x => {
          state.reset({x: 1, y: x * x, z: 0});
          state.update({z: x * x * 10});
        });
      state.pick(it => it.z).subscribe(z => changes.push(z));
      state.update({x: 2});
      state.update({x: 3});
      expect(changes).toEqual([0, 40, 10, 90, 10]);
    });
  });
});
