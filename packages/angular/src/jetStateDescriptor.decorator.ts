import {StateDescriptor} from '@jetstate/core';
import {defineStateDescriptor} from './internal/metadata';

// tslint:disable:ban-types

/**
 * @decorator
 */
export function JetStateDescriptor<Model extends object>(
    key: string,
    defaults?: Readonly<Model>
): (constructor: Function) => any;
export function JetStateDescriptor<Model extends object>(
    descriptor: StateDescriptor<Model>
): (constructor: Function) => any;
export function JetStateDescriptor<Model extends object>(
    descriptor: StateDescriptor<Model>,
    defaults?: Readonly<Model>
) {
    return (constructor: Function) => {
        if (typeof descriptor === 'string' && defaults) {
            defineStateDescriptor(constructor, {key: descriptor, defaults});
            return;
        }
        defineStateDescriptor(constructor, descriptor);
    };
}
