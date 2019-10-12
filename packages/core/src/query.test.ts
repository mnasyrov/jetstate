import {Query} from './query';
import {Store} from './store';

describe('Query', () => {
  describe('method select()', () => {
    it('should attach a listener for changes of a selected state value', () => {
      const store = new Store({foo: 1});
      store.update({foo: 2});

      const changes: number[] = [];
      const query = new Query(store);
      query.select(state => state.foo).subscribe(value => changes.push(value));

      store.update({foo: 3});
      expect(changes).toEqual([2, 3]);
    });

    it('should return a subscription for the attached listener', () => {
      const store = new Store({foo: 1});
      const query = new Query(store);
      const subscription = query
        .select(() => undefined)
        .subscribe(() => undefined);
      expect(subscription).toBeDefined();
    });

    it('should return a subscription the listener which allow to unsubscribe it', () => {
      const changes: number[] = [];
      const store = new Store({foo: 1});
      const query = new Query(store);
      const subscription = query
        .select(it => it.foo)
        .subscribe(value => changes.push(value));
      store.update({foo: 2});
      store.update({foo: 3});
      subscription.unsubscribe();
      store.update({foo: 4});
      expect(changes).toEqual([1, 2, 3]);
    });
  });
});
