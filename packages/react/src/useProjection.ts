import {Projection} from '@jetstate/core';
import {useEffect, useState} from 'react';

export function useProjection<V>(projection: Projection<V>): V {
  const [value, setValue] = useState<V>(projection.value);

  useEffect(() => {
    setValue(projection.value);
    const subscription = projection.changes$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [projection]);

  return value;
}
