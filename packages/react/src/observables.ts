import { Reducer, useEffect, useMemo, useReducer, useState } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';

export function useAsObservable<T>(value: T): Observable<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subject = useMemo(() => new BehaviorSubject(value), []);
  const value$ = useMemo(() => subject.asObservable(), [subject]);
  useEffect(() => {
    subject.next(value);
  }, [subject, value]);
  return value$;
}

export function useObservable<T>(value$: Observable<T>, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const subscription = value$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [value$]);

  return value;
}

export type ObservableState<T> = {
  status: 'initial' | 'loaded' | 'completed' | 'error';
  value: T;
  error?: any;
};

export function useObservableState<T>(
  value$: Observable<T>,
  initialValue: T,
): ObservableState<T> {
  const [state, dispatch] = useReducer<ObservableStateReducer<T>>(
    observableStateReducer,
    {
      status: 'initial',
      value: initialValue,
    },
  );

  useEffect(() => {
    const subscription = value$.subscribe({
      next: (value) => dispatch({ type: 'next', value }),
      complete: () => dispatch({ type: 'complete' }),
      error: (error) => dispatch({ type: 'error', error }),
    });
    return () => subscription.unsubscribe();
  }, [value$]);

  return state;
}

type ObservableStateAction<T> =
  | { type: 'next'; value: T }
  | { type: 'complete' }
  | { type: 'error'; error: any };

type ObservableStateReducer<T> = Reducer<
  ObservableState<T>,
  ObservableStateAction<T>
>;

function observableStateReducer<T>(
  state: ObservableState<T>,
  action: ObservableStateAction<T>,
): ObservableState<T> {
  switch (action.type) {
    case 'next':
      return { status: 'loaded', value: action.value };
    case 'complete':
      return { ...state, status: 'completed' };
    case 'error':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}
