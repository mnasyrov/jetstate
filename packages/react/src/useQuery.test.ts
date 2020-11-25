import {createQuery, createStore} from '@jetstate/core';
import {act, renderHook} from '@testing-library/react-hooks';
import {useQuery} from './useQuery';

describe('useQuery()', () => {
  it("should return a value of query's projection", () => {
    const store = createStore({value: 0});
    const query = createQuery(store);

    const {result} = renderHook(() => useQuery(query, state => state.value));
    expect(result.current).toBe(0);

    act(() => store.update({value: 1}));
    expect(result.current).toBe(1);
  });
});
