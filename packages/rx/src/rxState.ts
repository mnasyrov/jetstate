import {Selector, State} from '@jetstate/core';
import {Observable} from 'rxjs';
import {createRxProjection, RxProjection} from './rxProjection';

export class RxState<Model extends object> extends State<Model>
  implements RxProjection<Readonly<Model>> {
  private readonly stateProjection = createRxProjection(this);

  get current$(): Observable<Readonly<Model>> {
    return this.stateProjection.current$;
  }

  get changes$(): Observable<Readonly<Model>> {
    return this.stateProjection.changes$;
  }

  map<V>(selector: Selector<Model, V>): RxProjection<V> {
    return createRxProjection(super.map(selector));
  }
}
