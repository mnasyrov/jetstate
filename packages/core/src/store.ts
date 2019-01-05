import {State} from './state';
import {StateDescriptor} from './stateDescriptor';

export class Store {
    private readonly states = new Map<string, State<any>>();
    private readonly _parentStore: Store | undefined;

    constructor(parentStore?: Store) {
        this._parentStore = parentStore;
    }

    get parentStore(): Store | undefined {
        return this._parentStore;
    }

    snapshot(withParent?: boolean): Readonly<{[key: string]: any}> {
        let data: {[key: string]: any} = {};
        if (withParent && this.parentStore) {
            data = this.parentStore.snapshot(withParent);
        }
        this.states.forEach((state, key) => {
            data[key] = state.current;
        });
        return data;
    }

    reset(data: {[stateKey: string]: any}, withParent?: boolean) {
        const keys = Object.getOwnPropertyNames(data);
        keys.forEach(key => {
            const state = this.getState(key, !withParent);
            if (state) {
                state.reset(data[key]);
            }
        });
    }

    hasState(descriptor: StateDescriptor<any>, ownState?: boolean): boolean {
        const key = Store.getStateKey(descriptor);
        if (this.states.has(key)) {
            return true;
        }
        if (!ownState && this._parentStore) {
            return this._parentStore.hasState(key);
        }
        return false;
    }

    getState<Model extends object>(descriptor: StateDescriptor<Model>, ownState?: boolean): State<Model> | undefined {
        const key = Store.getStateKey(descriptor);
        let state: State<Model> | undefined = this.states.get(key) as State<Model>;
        if (!state && !ownState && this._parentStore) {
            state = this._parentStore.getState(key);
        }
        return state;
    }

    setState<Model extends object>(descriptor: StateDescriptor<Model>, state: State<Model>) {
        const key = Store.getStateKey(descriptor);
        this.states.set(key, state);
    }

    removeState(descriptor: StateDescriptor<any>) {
        const key: string = Store.getStateKey(descriptor);
        this.states.delete(key);
    }

    static getStateKey(descriptor: StateDescriptor<any>): string {
        return typeof descriptor === 'string' ? descriptor : descriptor.key;
    }

    static getStateDefaults<Model extends object>(descriptor: StateDescriptor<Model>): Readonly<Model> | undefined {
        return typeof descriptor === 'string' ? undefined : descriptor.defaults;
    }
}
