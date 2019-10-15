import { renderHook } from '@testing-library/react-hooks';
import { isObservable } from 'rxjs';
import { useAsObservable } from './observables';

describe('useAsObservable()', () => {
  it('should return an observable of passed values', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useAsObservable(value),
      {
        initialProps: { value: 0 },
      },
    );

    const value$ = result.current;
    expect(isObservable(value$)).toBe(true);

    const results: number[] = [];
    value$.subscribe((value) => results.push(value));

    rerender({ value: 1 });
    expect(value$).toBe(result.current);

    rerender({ value: 2 });
    expect(results).toEqual([0, 1, 2]);
  });
});
