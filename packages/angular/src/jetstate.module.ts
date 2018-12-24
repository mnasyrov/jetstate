import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {StateDeclaration, StateDescriptor, Store} from '@jetstate/core';
import {RxStore} from '@jetstate/rxjs';

@NgModule()
export class JetStateModule {
    private static readonly STORE_STATES_TOKEN = new InjectionToken('JETSTATE_TOKEN_STORE_STATES');

    static forRoot(states?: StateDeclaration<any>[]): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JetStateModule.STORE_STATES_TOKEN,
                    useValue: states
                },
                {
                    provide: RxStore,
                    deps: [JetStateModule.STORE_STATES_TOKEN],
                    useFactory: JetStateModule.createRxStore
                },
                {
                    provide: Store,
                    deps: [RxStore],
                    useFactory: JetStateModule.getStore
                }
            ]
        };
    }

    static createRxStore(states?: ReadonlyArray<StateDescriptor<any>>): RxStore {
        const store = new RxStore();
        if (states) {
            states.forEach(state => store.initState(state));
        }
        return store;
    }

    static getStore(store: RxStore): Store {
        return store;
    }
}
