import {StateContext} from './stateContext';
import {StateDeclaration} from './stateDeclaration';

type ContextKey = string;

export class Store {
    private readonly contextStore = new Map<ContextKey, StateContext<any>>();

    constructor(states?: ReadonlyArray<StateDeclaration<any>>) {
        if (states) {
            states.forEach(state => this.registerState(state));
        }
    }

    registerState<T>(stateDeclaration: StateDeclaration<T>, reset?: boolean) {
        if (!reset && this.contextStore.has(stateDeclaration.key)) {
            return;
        }
        const context = new StateContext<T>(stateDeclaration.defaults);
        this.contextStore.set(stateDeclaration.key, context);
    }

    getContextByKey<T>(stateKey: string): StateContext<T> | undefined {
        return this.contextStore.get(stateKey);
    }

    getContext<T>(stateDeclaration: StateDeclaration<T>): StateContext<T> | undefined {
        return this.contextStore.get(stateDeclaration.key);
    }

    /**
     * @throws `Error` in case the context is not found.
     */
    getContextOrFail<T>(stateDeclaration: StateDeclaration<T>): StateContext<T> {
        const context = this.getContext(stateDeclaration);
        if (!context) {
            throw new Error(`State context is not found: ${stateDeclaration.key}`);
        }
        return context;
    }
}
