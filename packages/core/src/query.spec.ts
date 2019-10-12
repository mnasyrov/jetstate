import {Query} from './query';
import {Store} from './store';

describe('Query', () => {
  describe('method pick().subscribe()', () => {
    it('should attach a listener for changes of a selected state value', () => {
      const changes: number[] = [];
      const store = new Store({foo: 1});
      const query = new Query(store);
      query.select(it => it.foo).subscribe(value => changes.push(value));
      store.update({foo: 2});
      expect(changes).toEqual([2]);
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
      expect(changes).toEqual([2, 3]);
    });
  });
});
