import {StateDescriptor} from '@jetstate/core';

// tslint:disable:ban-types

const JET_STATE_DESCRIPTOR = Symbol('JET_STATE_DESCRIPTOR');

export function defineJetStateDescriptor<T>(stateConstructor: Function, descriptor: StateDescriptor<any>) {
    (stateConstructor as any)[JET_STATE_DESCRIPTOR] = descriptor;
}

export function getJetStateDescriptor(stateConstructor: Function): StateDescriptor<any> | undefined {
    return (stateConstructor as any)[JET_STATE_DESCRIPTOR];
}
