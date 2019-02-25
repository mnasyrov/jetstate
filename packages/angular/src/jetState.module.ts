import {Inject, InjectionToken, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {State} from '@jetstate/core';
import {getJetStateDefaults, getJetStateKey} from './internal/metadata';
import {JetPipe} from './jetPipe';
import {JetStore} from './jetStore';

type JetStateConstructor = new (defaults?: any) => object;

@NgModule({
    declarations: [JetPipe],
    exports: [JetPipe]
})
export class JetStateModule {
    private static readonly STATES_TOKEN = new InjectionToken('JetStateModule.STATES_TOKEN');
    private static readonly ROOT_STORE_TOKEN = new InjectionToken('JetStateModule.ROOT_STORE_TOKEN');

    static forRoot(states: JetStateConstructor[] = []): ModuleWithProviders {
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
                    provide: JetStateModule.STATES_TOKEN,
                    useValue: states
                },
                states
            ]
        };
    }

    static forFeature(states: JetStateConstructor[] = []): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JetStore,
                    deps: [JetStore],
                    useFactory: JetStateModule.createChildStore
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
        @Inject(JetStateModule.STATES_TOKEN) states: JetStateConstructor[]
    ) {
        if (!states) {
            return;
        }
        states.forEach(stateConstructor => {
            const stateInstance = injector.get(stateConstructor);
            if (!stateInstance) {
                throw new Error(`State instance is not provided: ${stateConstructor}`);
            }
            if (!(stateInstance instanceof State)) {
                throw new Error(
                    `Provided state instance does not implement State from @jetstate/core: ${stateConstructor}`
                );
            }

            const stateKey = getJetStateKey(stateConstructor);
            const stateDefaults = getJetStateDefaults(stateConstructor);
            if (stateDefaults) {
                stateInstance.reset(stateDefaults);
            }
            if (stateKey) {
                store.setState(stateKey, stateInstance);
            }
        });
    }

    private static createRootStore(): JetStore {
        return new JetStore();
    }

    private static createChildStore(parentStore: JetStore): JetStore {
        return new JetStore(parentStore);
    }
}
