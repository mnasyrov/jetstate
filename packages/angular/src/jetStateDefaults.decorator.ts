import {defineJetStateDefaults} from './internal/metadata';

// tslint:disable:ban-types

/**
 * @decorator
 */
export function JetStateDefaults<Model extends object>(defaults: Readonly<Model>): (constructor: Function) => any {
    return (constructor: Function) => {
        if (defaults) {
            defineJetStateDefaults(constructor, defaults);
        }
    };
}
