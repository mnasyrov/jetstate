import {Projection} from './projection';
import {Consumer, Subscription} from './pubsub';

export function mapProjection<V, R>(source: Projection<V>, mapper: (value: V) => R): Projection<R> {
  return computeProjection<R>([source], () => mapper(source.value));
}

export function computeProjection<R>(
  triggers: Projection<any>[],
  valueProvider: () => R
): Projection<R> {
  const sourceValues: any[] = new Array(triggers.length);
  let lastResult: R;

  function calculate(): R {
    let isSourceChanged: boolean = false;
    for (let i = 0; i < triggers.length; i++) {
      const sourceValue = triggers[i].value;
      if (sourceValues[i] !== sourceValue) {
        sourceValues[i] = sourceValue;
        isSourceChanged = true;
      }
    }

    let result = lastResult;
    if (isSourceChanged) {
      result = valueProvider();
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

    const sourceSubscriptions: Subscription[] = triggers.map((source: Projection<any>) => {
      return source.listenChanges(() => changeHandler());
    });
    const listenerSubscription: Subscription = {
      unsubscribe() {
        sourceSubscriptions.forEach(sub => sub.unsubscribe());
      }
    };

    return listenerSubscription;
  }

  return {
    get value(): R {
      return calculate();
    },

    listenChanges(consumer: Consumer<R>): Subscription {
      return bindListener(consumer);
    }
  };
}
