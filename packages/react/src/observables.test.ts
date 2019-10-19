import {act, renderHook} from '@testing-library/react-hooks';
import {isObservable, Subject} from 'rxjs';
import {
  useAsObservable,
  useObservable,
  useObservableState,
} from './observables';

describe('useAsObservable()', () => {
  it('should return an observable of passed values', async () => {
    const {result, rerender} = renderHook(({value}) => useAsObservable(value), {
      initialProps: {value: 0},
    });

    const value$ = result.current;
    expect(isObservable(value$)).toBe(true);

    const results: number[] = [];
    value$.subscribe(value => results.push(value));

    rerender({value: 1});
    expect(value$).toBe(result.current);

    rerender({value: 2});
    expect(results).toEqual([0, 1, 2]);
  });
});

describe('useObservable()', () => {
  it('should return a value of an observable', () => {
    const subject = new Subject<number>();

    const {result} = renderHook(({value$}) => useObservable(value$, 0), {
      initialProps: {value$: subject},
    });
    expect(result.current).toBe(0);

    act(() => subject.next(1));
    expect(result.current).toBe(1);
  });

  it('should return undefined in case initial value is not specified', () => {
    const subject = new Subject<number>();

    const {result} = renderHook(({value$}) => useObservable(value$), {
      initialProps: {value$: subject},
    });
    expect(result.current).toBe(undefined);

    act(() => subject.next(1));
    expect(result.current).toBe(1);
  });
});

describe('useObservableState()', () => {
  it('should return a state according to state of an observable', () => {
    const subject = new Subject<number>();

    const {result} = renderHook(({value$}) => useObservableState(value$), {
      initialProps: {value$: subject},
    });
    expect(result.current).toEqual({
      status: 'initial',
      value: undefined,
      error: undefined,
    });

    act(() => subject.next(1));
    expect(result.current).toEqual({
      status: 'active',
      value: 1,
      error: undefined,
    });

    act(() => subject.next(2));
    expect(result.current).toEqual({
      status: 'active',
      value: 2,
      error: undefined,
    });

    act(() => subject.complete());
    expect(result.current).toEqual({
      status: 'completed',
      value: 2,
      error: undefined,
    });
  });

  it('should return an error state in case the observable emits error', () => {
    const subject = new Subject<number>();

    const {result} = renderHook(({value$}) => useObservableState(value$, 0), {
      initialProps: {value$: subject},
    });
    expect(result.current).toEqual({
      status: 'initial',
      value: 0,
      error: undefined,
    });

    act(() => subject.error(new Error('TestError')));
    expect(result.current).toEqual({
      status: 'error',
      value: 0,
      error: new Error('TestError'),
    });
  });
});
