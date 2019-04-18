// tslint:disable:ban-types

const JETSTATE_DEFAULTS = Symbol('JETSTATE_DEFAULTS');

export function defineJetStateDefaults<T>(stateConstructor: Function, defaults: object) {
    (stateConstructor as any)[JETSTATE_DEFAULTS] = defaults;
}

export function getJetStateDefaults(stateConstructor: Function): object | undefined {
    return (stateConstructor as any)[JETSTATE_DEFAULTS];
}
