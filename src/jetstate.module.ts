import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {StateOptions} from './stateOptions';
import {Store} from './store';

export const JETSTATE_TOKEN_STORE_STATES = new InjectionToken('JETSTATE_TOKEN_STORE_STATES');

@NgModule()
export class JetStateModule {
    static forRoot(states: StateOptions<any>[] = []): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JETSTATE_TOKEN_STORE_STATES,
                    useValue: states
                },
                {
                    deps: [JETSTATE_TOKEN_STORE_STATES],
                    provide: Store,
                    useFactory: JetStateModule.createStore
                }
            ]
        };
    }

    static createStore(states: ReadonlyArray<StateOptions<any>>): Store {
        return new Store(states);
    }
}
