import {StateAccessor, StateValueSelector} from '@jetstate/core';
import {Observable} from 'rxjs';

export class RxStateAccessor<StateModel> extends StateAccessor<StateModel> {
    select<V>(selector: StateValueSelector<StateModel, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listen(selector, value => subscriber.next(value));
        });
    }

    selectChanges<V>(selector: StateValueSelector<StateModel, V>, onlyOnce?: boolean): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listenChanges(selector, value => subscriber.next(value), onlyOnce);
        });
    }
}
