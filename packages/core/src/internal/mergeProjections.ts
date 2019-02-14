import {Projection} from '../projection';
import {Consumer} from '../pubsub/consumer';
import {Subscription} from '../pubsub/subscription';

export function mergeProjections<R>(merger: (...values: any[]) => R, ...sources: Projection<any>[]): Projection<R> {
    const sourceValues: any[] = new Array(sources.length);
    let lastResult: R;

    return {
        getValue(): R {
            return calculate();
        },

        listen(consumer: Consumer<R>): Subscription {
            return bindListener(consumer, true);
        },

        listenChanges(consumer: Consumer<R>): Subscription {
            return bindListener(consumer, false);
        }
    };

    function calculate(): R {
        let isSourceChanged: boolean = false;
        for (let i = 0; i < sources.length; i++) {
            const sourceValue = sources[i].getValue();
            if (sourceValues[i] !== sourceValue) {
                sourceValues[i] = sourceValue;
                isSourceChanged = true;
            }
        }

        let result = lastResult;
        if (isSourceChanged) {
            result = merger(...sourceValues);
        }

        const isChanged = lastResult !== result;
        if (isChanged) {
            lastResult = result;
        }
        return result;
    }

    function bindListener(consumer: Consumer<R>, pushCurrent: boolean): Subscription {
        let lastConsumedResult: R;

        function changeHandler() {
            const result = calculate();
            if (result !== lastConsumedResult) {
                lastConsumedResult = result;
                consumer(result);
            }
        }

        const sourceSubscriptions: Subscription[] = sources.map((source: Projection<any>) => {
            return source.listenChanges(() => changeHandler());
        });
        const listenerSubscription: Subscription = {
            unsubscribe() {
                sourceSubscriptions.forEach(sub => sub.unsubscribe());
            }
        };

        // Push a current state to the consumer of the selected value;
        if (pushCurrent) {
            try {
                lastConsumedResult = calculate();
                consumer(lastConsumedResult);
            } catch (error) {
                listenerSubscription.unsubscribe();
                throw error;
            }
        }

        return listenerSubscription;
    }
}
