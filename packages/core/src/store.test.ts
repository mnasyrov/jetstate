import {Store} from './store';

describe('Store', () => {
  describe('.state', () => {
    it('should return a current state', () => {
      const store = new Store({});
      expect(store.state).toBeTruthy();
    });

    it('should return a current state', () => {
      const defaults = {foo: 'bar'};
      const store = new Store(defaults);
      expect(store.state).toEqual(defaults);
    });

    it('an initial state must be equal to it self', () => {
      const defaults = {foo: 'bar'};
      const store = new Store(defaults);
      expect(store.state).toBe(defaults);
    });
  });

  describe('.reset()', () => {
    it('should reset to a new state', () => {
      const store = new Store({foo: 'bar', xyz: 0});
      store.reset({foo: 'baz', xyz: 1});
      expect(store.state).toEqual({foo: 'baz', xyz: 1});
    });

    it('should reset in case of a partial new state ', () => {
      const store = new Store({foo: 'bar', xyz: 0});
      store.reset({foo: 'baz', xyz: 1});
      store.reset({foo: 'abc'} as any);
      expect(store.state).toEqual({foo: 'abc'});
    });

    it('should reset in case a current state has an extra field', () => {
      const store = new Store({foo: 'bar', xyz: 0});
      store.update({extraField: 1} as any);
      store.reset({foo: 'abc'} as any);
      expect(store.state).toEqual({foo: 'abc'});
    });
  });

  describe('method update()', () => {
    it('should update a whole state', () => {
      const store = new Store({foo: 'bar', xyz: 0});
      store.update({foo: 'baz', xyz: 1});
      expect(store.state).toEqual({foo: 'baz', xyz: 1});
    });

    it('should update a partial state', () => {
      const store = new Store({foo: 'bar', xyz: 0});
      store.update({foo: 'baz'});
      expect(store.state).toEqual({foo: 'baz', xyz: 0});
    });

    it('should not modify anything in case a new state is null or undefined', () => {
      const store = new Store({foo: 'bar'});
      const expectedState = store.state;

      store.update(null as any);
      expect(store.state).toBe(expectedState);

      store.update(undefined as any);
      expect(store.state).toBe(expectedState);
    });
  });

  describe('triggering value listeners with a new state by update() and reset() methods', () => {
    it('should trigger a listener in case a state was changed', () => {
      const store = new Store({bar: 0, foo: 0});
      const stateUpdates: any[] = [];
      store.state$.subscribe(state => stateUpdates.push(state));
      store.update({foo: 1});
      store.update({foo: 2});
      store.update({bar: 42});
      store.update({foo: 2});
      store.update({foo: 3});
      expect(stateUpdates).toEqual([
        {bar: 0, foo: 0},
        {bar: 0, foo: 1},
        {bar: 0, foo: 2},
        {bar: 42, foo: 2},
        {bar: 42, foo: 3},
      ]);
    });

    it('should keeps pending state patches during applying a current state updates', () => {
      const store = new Store({x: 0, y: 0, z: 0});
      const stateUpdates: any[] = [];
      store.state$.subscribe(state => stateUpdates.push(state));
      store.state$.subscribe(({x}) => store.update({y: x * x}));
      store.state$.subscribe(({y}) => store.update({z: y * 10}));
      store.update({x: 1});
      store.update({x: 2});
      store.update({x: 3});
      expect(stateUpdates).toEqual([
        {x: 0, y: 0, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 0},
        {x: 1, y: 1, z: 10},
        {x: 2, y: 1, z: 10},
        {x: 2, y: 4, z: 10},
        {x: 2, y: 4, z: 40},
        {x: 3, y: 4, z: 40},
        {x: 3, y: 9, z: 40},
        {x: 3, y: 9, z: 90},
      ]);
    });

    it('should keeps pending state resets during applying a current state updates', () => {
      const store = new Store({x: 0, y: 0, z: 0});
      const stateUpdates: any[] = [];
      store.state$.subscribe(state => stateUpdates.push(state));
      store.state$.subscribe(({x}) => {
        store.reset({x, y: x * x, z: 0});
        store.update({z: x * x * 10});
      });
      store.update({x: 1});
      store.update({x: 2});
      store.update({x: 3});
      expect(stateUpdates).toEqual([
        {x: 0, y: 0, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 10},
        {x: 2, y: 1, z: 10},
        {x: 2, y: 4, z: 40},
        {x: 3, y: 4, z: 40},
        {x: 3, y: 9, z: 90},
      ]);
    });
  });
});
