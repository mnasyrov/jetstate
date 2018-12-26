import {State} from './state';
import {StateDescriptor} from './stateDescriptor';

export class Store {
    private readonly states = new Map<string, State<any>>();

    dump(): Readonly<{[key: string]: any}> {
        const dump: {[key: string]: any} = {};
        this.states.forEach((state, key) => {
            dump[key] = state.current;
        });
        return dump;
    }

    restore(dump: {[key: string]: any}) {
        const keys = Object.getOwnPropertyNames(dump);
        keys.forEach(key => {
            this.getOrCreateState(key).reset(dump[key]);
        });
    }

    registerState(descriptor: StateDescriptor<any>) {
        if (!this.hasState(descriptor)) {
            this.getOrCreateState(descriptor).reset();
        }
    }

    hasState(descriptor: StateDescriptor<any>): boolean {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        return this.states.has(key);
    }

    getState<Model extends object>(descriptor: StateDescriptor<Model>): State<Model> {
        return this.getOrCreateState(descriptor);
    }

    setState<Model extends object>(descriptor: StateDescriptor<Model>, state: State<Model>) {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        this.states.set(key, state);
    }

    removeState(descriptor: StateDescriptor<any>) {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        this.states.delete(key);
    }

    private getOrCreateState<Model extends object>(descriptor: StateDescriptor<Model>): State<Model> {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        let state: State<Model> = this.states.get(key) as State<Model>;
        if (!state) {
            state = this.createNewState(descriptor);
            this.states.set(key, state);
        }
        return state;
    }

    private createNewState<Model extends object>(descriptor: StateDescriptor<Model>): State<Model> {
        const defaults = typeof descriptor === 'string' ? undefined : descriptor.defaults;
        return new State<Model>(defaults);
    }
}
