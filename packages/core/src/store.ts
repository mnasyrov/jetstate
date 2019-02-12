import {State} from './state';

export class Store {
    private readonly states = new Map<string, State<any>>();
    private readonly _parentStore: Store | undefined;

    constructor(parentStore?: Store) {
        this._parentStore = parentStore;
    }

    getParentStore(): Store | undefined {
        return this._parentStore;
    }

    hasState(stateKey: string, ownState?: boolean): boolean {
        if (this.states.has(stateKey)) {
            return true;
        }
        if (!ownState && this._parentStore) {
            return this._parentStore.hasState(stateKey);
        }
        return false;
    }

    getState<Model extends object>(stateKey: string, ownState?: boolean): State<Model> | undefined {
        let state: State<Model> | undefined = this.states.get(stateKey) as State<Model>;
        if (!state && !ownState && this._parentStore) {
            state = this._parentStore.getState(stateKey);
        }
        return state;
    }

    setState<Model extends object>(stateKey: string, state: State<Model>) {
        this.states.set(stateKey, state);
    }

    removeState(stateKey: string) {
        this.states.delete(stateKey);
    }

    snapshot(withParent?: boolean): Readonly<{[key: string]: any}> {
        let data: {[key: string]: any} = {};
        const parentStore = this.getParentStore();
        if (withParent && parentStore) {
            data = parentStore.snapshot(withParent);
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
}
