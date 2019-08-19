import {Consumer, Projection, Selector, State} from '@jetstate/core';
import {defer, Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';

export interface RxProjection<V> extends Projection<V> {
  readonly current$: Observable<V>;
  readonly changes$: Observable<V>;
}

export function createRxProjection<V>(
  projection: Projection<V>,
): RxProjection<V> {
  return {
    get current(): V {
      return projection.current;
    },

    get current$(): Observable<V> {
      return defer(() => this.changes$.pipe(startWith<V, V>(this.current)));
    },

    get changes$(): Observable<V> {
      return new Observable<V>(subscriber => {
        return projection.subscribe(value => subscriber.next(value));
      });
    },

    subscribe(consumer: Consumer<V>) {
      return projection.subscribe(consumer);
    },
  };
}

export class RxState<Model extends object> extends State<Model>
  implements RxProjection<Readonly<Model>> {
  private readonly stateProjection = createRxProjection(this);

  get current$(): Observable<Readonly<Model>> {
    return this.stateProjection.current$;
  }

  get changes$(): Observable<Readonly<Model>> {
    return this.stateProjection.changes$;
  }

  pick<V>(selector: Selector<Model, V>): RxProjection<V> {
    return createRxProjection(super.pick(selector));
  }
}
