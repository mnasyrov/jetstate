import {StateDescriptor} from '@jetstate/core';

// tslint:disable:ban-types

const STATE_DESCRIPTOR = Symbol();

export function defineStateDescriptor<T>(stateConstructor: Function, descriptor: StateDescriptor<any>) {
    (stateConstructor as any)[STATE_DESCRIPTOR] = descriptor;
}

export function getStateDescriptor(stateConstructor: Function): StateDescriptor<any> | undefined {
    return (stateConstructor as any)[STATE_DESCRIPTOR];
}
