import {Inject, InjectionToken, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {State, StateDescriptor, Store} from '@jetstate/core';
import {getJetStateDescriptor} from './internal/metadata';
import {JetState} from './jetState';
import {JetStore} from './jetStore';

type JetStateConstructor = new (defaults?: any) => object;

export interface JetStateModuleOptions {
    descriptors?: StateDescriptor<any>[];
}

@NgModule()
export class JetStateModule {
    private static readonly STATES_TOKEN = new InjectionToken('JetStateModule.STATES_TOKEN');
    private static readonly OPTIONS_TOKEN = new InjectionToken('JetStateModule.OPTIONS_TOKEN');
    private static readonly ROOT_STORE_TOKEN = new InjectionToken('JetStateModule.ROOT_STORE_TOKEN');

    static forRoot(states: JetStateConstructor[] = [], options: JetStateModuleOptions = {}): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JetStore,
                    useFactory: JetStateModule.createRootStore
                },
                {
                    provide: JetStateModule.ROOT_STORE_TOKEN,
                    useExisting: JetStore
                },
                {
                    provide: JetStateModule.OPTIONS_TOKEN,
                    useValue: options
                },
                {
                    provide: JetStateModule.STATES_TOKEN,
                    useValue: states
                },
                states
            ]
        };
    }

    static forFeature(states: JetStateConstructor[] = [], options: JetStateModuleOptions = {}): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JetStore,
                    deps: [JetStore],
                    useFactory: JetStateModule.createChildStore
                },
                {
                    provide: JetStateModule.OPTIONS_TOKEN,
                    useValue: options
                },
                {
                    provide: JetStateModule.STATES_TOKEN,
                    useValue: states
                },
                states
            ]
        };
    }

    constructor(
        injector: Injector,
        store: JetStore,
        @Inject(JetStateModule.OPTIONS_TOKEN) options: JetStateModuleOptions,
        @Inject(JetStateModule.STATES_TOKEN) states: JetStateConstructor[]
    ) {
        if (options.descriptors) {
            options.descriptors.forEach(decriptor => JetStateModule.registerState(store, decriptor));
        }

        if (states) {
            states.forEach(stateConstructor => {
                const descriptor = getJetStateDescriptor(stateConstructor);
                if (!descriptor) {
                    throw new Error(`Not found a state descriptor for: ${stateConstructor}`);
                }

                const stateInstance = injector.get(stateConstructor);
                if (!stateInstance) {
                    throw new Error(`State instance is not provided: ${stateConstructor}`);
                }

                if (stateInstance instanceof State) {
                    store.setState(descriptor, stateInstance);

                    const defaults = typeof descriptor === 'string' ? undefined : descriptor.defaults;
                    if (defaults) {
                        stateInstance.reset(defaults);
                    }
                }
            });
        }
    }

    private static createRootStore(): JetStore {
        return new JetStore();
    }

    private static createChildStore(parentStore: JetStore): JetStore {
        return new JetStore(parentStore);
    }

    private static registerState(store: JetStore, descriptor: StateDescriptor<any>) {
        if (store.hasState(descriptor, true)) {
            return;
        }

        const state = new JetState();
        const defaults = Store.getStateDefaults(descriptor);
        if (defaults) {
            state.reset(defaults);
        }
        store.setState(descriptor, state);
    }
}
