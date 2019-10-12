import {createProjection, Query, Selector} from '@jetstate/core';
import {Observable} from 'rxjs';
import {createRxProjection, RxProjection} from './rxProjection';

export class RxQuery<State extends object> extends Query<State> {
  private readonly stateProjection = createRxProjection(this.store);

  get state$(): Observable<State> {
    return this.stateProjection.value$;
  }

  select<V>(selector: Selector<State, V>): RxProjection<V> {
    return createRxProjection(createProjection(this.store, selector));
  }
}
