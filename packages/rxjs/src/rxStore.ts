import {StateDescriptor, StateValueSelector, Store} from '@jetstate/core';
import {Observable} from 'rxjs';

export class RxStore extends Store {
    select<StateModel, V>(
        descriptor: StateDescriptor<StateModel>,
        selector: StateValueSelector<StateModel, V>
    ): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listen(descriptor, selector, value => subscriber.next(value));
        });
    }

    selectChanges<StateModel, V>(
        descriptor: StateDescriptor<StateModel>,
        selector: StateValueSelector<StateModel, V>,
        onlyOnce?: boolean
    ): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listenChanges(descriptor, selector, value => subscriber.next(value), onlyOnce);
        });
    }
}
