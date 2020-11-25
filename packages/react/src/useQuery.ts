import {Query, Selector} from '@jetstate/core';
import {useMemo, useRef} from 'react';
import {useProjection} from './useProjection';

export function useQuery<State extends object, V>(
  query: Query<State>,
  selector: Selector<State, V>,
): V {
  const selectorRef = useRef(selector);
  const projection = useMemo(() => query.project(selectorRef.current), [query]);
  return useProjection(projection);
}
