import {Selector, State} from '@jetstate/core';
import {Observable} from 'rxjs';
import {
  createMutableRxProjection,
  MutableRxProjection,
} from './mutableRxProjection';
import {createRxProjection, RxProjection} from './rxProjection';

export class RxState<Model extends object> extends State<Model>
  implements RxProjection<Readonly<Model>> {
  private readonly stateProjection = createRxProjection(this);

  get value$(): Observable<Readonly<Model>> {
    return this.stateProjection.value$;
  }

  get changes$(): Observable<Readonly<Model>> {
    return this.stateProjection.changes$;
  }

  map<V>(selector: Selector<Model, V>): RxProjection<V> {
    return createRxProjection(super.map(selector));
  }

  /** @experimental */
  mapMutable<V>(
    selector: Selector<Model, V>,
    patcher: (value: V) => Partial<Model>,
  ): MutableRxProjection<V> {
    return createMutableRxProjection(this.map(selector), value =>
      this.update(patcher(value)),
    );
  }
}
