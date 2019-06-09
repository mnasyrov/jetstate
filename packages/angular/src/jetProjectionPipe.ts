import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Projection, Subscription} from '@jetstate/core';

@Pipe({name: 'jet', pure: false})
export class JetProjectionPipe implements OnDestroy, PipeTransform {
  private _projection: Projection<any> | undefined;
  private _subscription: Subscription | undefined;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._subscription = undefined;
    this._projection = undefined;
  }

  transform<V>(projection: Projection<V>): V | undefined {
    if (!projection) {
      return undefined;
    }

    if (this._projection !== projection) {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      this._projection = projection;
      this._subscription = projection.listenChanges(() => {
        this.changeDetectorRef.markForCheck();
      });
    }

    return projection.value;
  }
}
