import {Observable} from 'rxjs';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {StateContext} from './internal/stateContext';
import {StateDescriptor} from './stateDescriptor';
import {StateValueSelector} from './stateValueSelector';

export class Store {
    private readonly contextStore = new Map<string, StateContext<any>>();

    constructor(descriptors?: ReadonlyArray<StateDescriptor<any>>) {
        if (descriptors) {
            descriptors.forEach(state => this.initState(state));
        }
    }

    dumpStore(): Readonly<{[key: string]: any}> {
        const dump: {[key: string]: any} = {};
        this.contextStore.forEach((context, key) => {
            dump[key] = context.getState();
        });
        return dump;
    }

    restoreDump(dump: {[key: string]: any}) {
        const keys = Object.getOwnPropertyNames(dump);
        keys.forEach(key => this.resetState(key, dump[key]));
    }

    initState<StateModel>(descriptor: StateDescriptor<StateModel>) {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        if (!this.contextStore.has(key)) {
            this.resetState(descriptor);
        }
    }

    getState<StateModel>(descriptor: StateDescriptor<StateModel>): Readonly<StateModel> {
        return this.getContext(descriptor).getState();
    }

    patchState<StateModel>(descriptor: StateDescriptor<StateModel>, newState: Partial<StateModel>) {
        this.getContext(descriptor).patch(newState);
    }

    resetState<StateModel>(descriptor: StateDescriptor<StateModel>, newState?: Partial<StateModel>) {
        this.getContext(descriptor).reset(newState);
    }

    getValue<StateModel, V>(descriptor: StateDescriptor<StateModel>, selector: StateValueSelector<StateModel, V>): V {
        const state = this.getContext(descriptor).getState();
        return selector(state);
    }

    select<StateModel, V>(
        descriptor: StateDescriptor<StateModel>,
        selector: StateValueSelector<StateModel, V>
    ): Observable<V> {
        const context = this.getContext(descriptor);
        return context.state$.pipe(
            map(selector),
            distinctUntilChanged()
        );
    }

    selectOnce<StateModel, V>(
        descriptor: StateDescriptor<StateModel>,
        selector: StateValueSelector<StateModel, V>
    ): Observable<V> {
        return this.select(descriptor, selector).pipe(take(1));
    }

    observe<StateModel, V>(
        descriptor: StateDescriptor<StateModel>,
        selector: StateValueSelector<StateModel, V>
    ): Observable<V> {
        const context = this.getContext(descriptor);
        return context.stateUpdates$.pipe(
            map(selector),
            distinctUntilChanged()
        );
    }

    observeOnce<StateModel, V>(
        descriptor: StateDescriptor<StateModel>,
        selector: StateValueSelector<StateModel, V>
    ): Observable<V> {
        return this.observe(descriptor, selector).pipe(take(1));
    }

    private setNewContext<StateModel>(descriptor: StateDescriptor<StateModel>): StateContext<StateModel> {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        const defaults = typeof descriptor === 'string' ? undefined : descriptor.defaults;
        const context = new StateContext<StateModel>(key, defaults);
        this.contextStore.set(key, context);
        return context;
    }

    private getContext<StateModel>(descriptor: StateDescriptor<StateModel>): StateContext<StateModel> {
        const key: string = typeof descriptor === 'string' ? descriptor : descriptor.key;
        const context = this.contextStore.get(key);
        if (context) {
            return context;
        } else {
            return this.setNewContext(descriptor);
        }
    }
}
