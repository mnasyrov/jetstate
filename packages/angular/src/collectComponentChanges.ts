import {SimpleChanges} from '@angular/core';

export type NgComponentInputMapper<Component, Model> = {
  [inputKey in keyof Component]?: (
    value: Component[inputKey],
  ) => Partial<Readonly<Model>> | undefined;
};

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
