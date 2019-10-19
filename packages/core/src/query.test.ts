import {Query, select} from './query';
import {Store} from './store';

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
});
