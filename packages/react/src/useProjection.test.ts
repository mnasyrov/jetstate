import {createStore, project} from '@jetstate/core';
import {act, renderHook} from '@testing-library/react-hooks';
import {useProjection} from './useProjection';

describe('useProjection()', () => {
  it('should return a value of a projection', () => {
    const store = createStore({value: 0});
    const projection = project(store, state => state.value);

    const {result} = renderHook(({p}) => useProjection(p), {
      initialProps: {p: projection},
    });
    expect(result.current).toBe(0);

    act(() => store.update({value: 1}));
    expect(result.current).toBe(1);
  });
});
