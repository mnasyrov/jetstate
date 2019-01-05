import {State, StateValueSelector} from '@jetstate/core';
import {Observable} from 'rxjs';

export class RxState<Model extends object> extends State<Model> {
    select<V>(selector: StateValueSelector<Model, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listen(selector, value => subscriber.next(value));
        });
    }

    selectChanges<V>(selector: StateValueSelector<Model, V>): Observable<V> {
        return new Observable<V>(subscriber => {
            return this.listenChanges(selector, value => subscriber.next(value));
        });
    }
}
