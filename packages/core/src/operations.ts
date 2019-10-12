import {Consumer, Subscription} from '@mnasyrov/pubsub';
import {Projection} from './projection';

export function map<V, R>(
  source: Projection<V>,
  factory: (value: V) => R,
): Projection<R> {
  return merge({value: source}, ({value}) => factory(value));
}

export function merge<T, R>(
  sources: {[P in keyof T]: Projection<T[P]>} & {
    [key: string]: Projection<any>;
  },
  factory: (values: T) => R,
): Projection<R> {
  const sourceProps = Object.getOwnPropertyNames(sources);
  const projections = sourceProps.map(prop => sources[prop]);

  const sourceValues: any[] = new Array(projections.length);
  let lastResult: R;

  function calculate(): R {
    let isSourceChanged: boolean = false;
    for (let i = 0; i < projections.length; i++) {
      const sourceValue = projections[i].value;
      if (sourceValues[i] !== sourceValue) {
        sourceValues[i] = sourceValue;
        isSourceChanged = true;
      }
    }

    let result = lastResult;
    if (isSourceChanged) {
      const values: T & {[key: string]: any} = {} as any;
      sourceProps.forEach(prop => (values[prop] = sources[prop].value));
      result = factory(values);
    }

    const isChanged = lastResult !== result;
    if (isChanged) {
      lastResult = result;
    }
    return result;
  }

  function bindListener(consumer: Consumer<R>): Subscription {
    let lastConsumedResult: R;

    function changeHandler() {
      const result = calculate();
      if (result !== lastConsumedResult) {
        lastConsumedResult = result;
        consumer(result);
      }
    }

    const sourceSubscriptions: Subscription[] = projections.map(
      (source: Projection<any>) => {
        return source.subscribe(() => changeHandler());
      },
    );

    return {
      unsubscribe() {
        sourceSubscriptions.forEach(sub => sub.unsubscribe());
      },
    };
  }

  return {
    get value(): R {
      return calculate();
    },

    subscribe(consumer: Consumer<R>): Subscription {
      return bindListener(consumer);
    },
  };
}
