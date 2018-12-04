import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {StateDeclaration, Store} from '@jetstate/core';

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
                    provide: Store,
                    deps: [JetStateModule.STORE_STATES_TOKEN],
                    useFactory: JetStateModule.createStore
                }
            ]
        };
    }

    static createStore(states?: ReadonlyArray<StateDeclaration<any>>): Store {
        return new Store(states);
    }
}
