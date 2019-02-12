import {defineJetStateKey} from './internal/metadata';

// tslint:disable:ban-types

/**
 * @decorator
 */
export function JetStateKey<Model extends object>(stateKey: string): (constructor: Function) => any {
    return (constructor: Function) => {
        if (stateKey) {
            defineJetStateKey(constructor, stateKey);
        }
    };
}
