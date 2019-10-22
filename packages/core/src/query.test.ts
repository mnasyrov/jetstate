import {createQuery, project, Query, select} from './query';
import {createStore, Store} from './store';

describe('select()', () => {
  it('should return an observable which pushes a current value first', () => {
    let result;
    const store = new Store({foo: 1});

    const value$ = select(store, state => state.foo);
    store.update({foo: 2});

    const subscription = value$.subscribe(value => (result = value));
    expect(result).toBe(2);

    store.update({foo: 3});
    expect(result).toBe(3);

    subscription.unsubscribe();
    store.update({foo: 4});
    expect(result).toBe(3);
  });
});

describe('project()', () => {
  it('should return a projection', () => {
    const store = new Store({foo: 1});
    const projection = project(store, state => state.foo);
    expect(projection).toBeDefined();
  });

  describe('Projection', () => {
    describe('.value', () => {
      it('should return a current value', () => {
        const store = new Store({foo: 1});

        const projection = project(store, state => state.foo);
        expect(projection.value).toBe(1);

        store.update({foo: 2});
        expect(projection.value).toBe(2);

        store.update({foo: 3});
        expect(projection.value).toBe(3);
      });
    });

    describe('.value$', () => {
      it('should return an observable with value changes', () => {
        let result;
        const store = new Store({foo: 1});

        const projection = project(store, state => state.foo);
        store.update({foo: 2});

        const subscription = projection.value$.subscribe(
          value => (result = value),
        );
        expect(result).toBe(undefined);

        store.update({foo: 3});
        expect(result).toBe(3);

        subscription.unsubscribe();
        store.update({foo: 4});
        expect(result).toBe(3);
      });
    });

    describe('.select()', () => {
      it('should return an observable with a current value and value changes', () => {
        let result;
        const store = new Store({foo: 1});

        const projection = project(store, state => state.foo);
        store.update({foo: 2});

        const subscription = projection
          .select()
          .subscribe(value => (result = value));
        expect(result).toBe(2);

        store.update({foo: 3});
        expect(result).toBe(3);

        subscription.unsubscribe();
        store.update({foo: 4});
        expect(result).toBe(3);
      });
    });
  });
});

describe('class Query', () => {
  describe('.state', () => {
    it('should return a current state of the store', () => {
      const store = new Store({foo: 1});
      const query = new Query(store);
      expect(query.state).toEqual({foo: 1});

      store.update({foo: 2});
      expect(query.state).toEqual({foo: 2});
    });
  });

  describe('.select()', () => {
    it('should return an observable which pushes a current value first', () => {
      let result;
      const store = new Store({foo: 1});
      const query = new Query(store);

      const value$ = query.select(state => state.foo);
      store.update({foo: 2});

      const subscription = value$.subscribe(value => (result = value));
      expect(result).toBe(2);

      store.update({foo: 3});
      expect(result).toBe(3);

      subscription.unsubscribe();
      store.update({foo: 4});
      expect(result).toBe(3);
    });
  });

  describe('.project()', () => {
    it('should return a projection with a current value and value$ observable', () => {
      let result;
      const store = createStore({foo: 1});
      const query = createQuery(store);

      const projection = query.project(state => state.foo);
      store.update({foo: 2});

      const subscription = projection.value$.subscribe(
        value => (result = value),
      );
      expect(projection.value).toBe(2);
      expect(result).toBe(2);

      store.update({foo: 3});
      expect(projection.value).toBe(3);
      expect(result).toBe(3);

      subscription.unsubscribe();
      store.update({foo: 4});
      expect(projection.value).toBe(4);
      expect(result).toBe(3);
    });
  });
});
