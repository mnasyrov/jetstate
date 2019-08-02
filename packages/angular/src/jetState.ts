import {Inject, InjectionToken, Optional, SimpleChanges} from '@angular/core';
import {RxState} from '@jetstate/rx';

export type NgComponentInputMapper<Component, Model> = {
  [inputKey in keyof Component]?: (
    value: Component[inputKey],
  ) => Partial<Readonly<Model>> | undefined;
};

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

  /** @deprecated */
  updateByNgChanges<Component>(
    changes: SimpleChanges,
    inputs: NgComponentInputMapper<Component, Model>,
  ) {
    const newState = collectComponentChanges(changes, inputs);
    this.update(newState);
  }
}

export function collectComponentChanges<Component, Model extends object>(
  changes: SimpleChanges,
  inputs: NgComponentInputMapper<Component, Model>,
): Partial<Model> | undefined {
  let newState: Model | undefined;

  const inputKeys = Object.getOwnPropertyNames(inputs);
  for (const inputKey of inputKeys) {
    const change = changes[inputKey];
    const patchCallback = (inputs as any)[inputKey];
    if (!change || !patchCallback) {
      continue;
    }
    const stateUpdate = patchCallback(change.currentValue);
    if (stateUpdate) {
      newState = Object.assign(newState || {}, stateUpdate);
    }
  }

  return newState;
}
