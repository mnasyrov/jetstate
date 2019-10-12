import {SimpleChanges} from '@angular/core';
import {Store} from '@jetstate/core';

export type NgComponentInputMapper<Component, State> = {
  [inputKey in keyof Component]?: (
    value: Component[inputKey],
  ) => Partial<Readonly<State>> | undefined;
};

export function createStoreUpdaterByComponentChanges<
  Component,
  State extends object
>(
  store: Store<State>,
  inputs: NgComponentInputMapper<Component, State>,
): (changes: SimpleChanges) => void {
  return function(changes: SimpleChanges) {
    let patch: Partial<Readonly<State>> | undefined;

    const inputKeys = Object.getOwnPropertyNames(inputs);
    inputKeys.forEach(inputKey => {
      const change = changes[inputKey];
      const patchCallback = (inputs as any)[inputKey];
      if (!change || !patchCallback) {
        return;
      }
      const nextPatch = patchCallback(change.currentValue);
      if (nextPatch) {
        patch = Object.assign(patch || {}, nextPatch);
      }
    });

    if (patch) {
      store.update(patch);
    }
  };
}
