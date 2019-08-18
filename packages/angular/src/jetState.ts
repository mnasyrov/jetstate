import {Inject, InjectionToken, Optional} from '@angular/core';
import {RxState} from '@jetstate/rx';

// This token must be never use outside.
// It fixes errors during injection by Angular when it cannot resolve type of `defaults` parameter.
const DEFAULTS_PRIVATE_TOKEN = new InjectionToken<any>(
  '__DEFAULTS_PRIVATE_TOKEN__',
);

export class JetState<Model extends object> extends RxState<Model> {
  constructor(
    @Optional() @Inject(DEFAULTS_PRIVATE_TOKEN) defaults?: Readonly<Model>,
  ) {
    super(defaults);
  }
}
