// tslint:disable:ban-types

const JETSTATE_KEY = Symbol('JETSTATE_KEY');
const JETSTATE_DEFAULTS = Symbol('JETSTATE_DEFAULTS');

export function defineJetStateKey<T>(stateConstructor: Function, stateKey: string) {
    (stateConstructor as any)[JETSTATE_KEY] = stateKey;
}

export function getJetStateKey(stateConstructor: Function): string | undefined {
    return (stateConstructor as any)[JETSTATE_DEFAULTS];
}

export function defineJetStateDefaults<T>(stateConstructor: Function, defaults: object) {
    (stateConstructor as any)[JETSTATE_DEFAULTS] = defaults;
}

export function getJetStateDefaults(stateConstructor: Function): object | undefined {
    return (stateConstructor as any)[JETSTATE_DEFAULTS];
}
