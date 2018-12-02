import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {StateOptions} from './stateOptions';
import {Store} from './store';

@NgModule()
export class StoreModule {
    static STORE_MODULE_STATES_TOKEN = new InjectionToken('STORE_MODULE_STATES_TOKEN');

    static forRoot(states: StateOptions<any>[] = []): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                {
                    provide: StoreModule.STORE_MODULE_STATES_TOKEN,
                    useValue: states
                },
                {
                    deps: [StoreModule.STORE_MODULE_STATES_TOKEN],
                    provide: Store,
                    useFactory: StoreModule.createStore
                }
            ]
        };
    }

    static createStore(states: ReadonlyArray<StateOptions<any>>): Store {
        return new Store(states);
    }
}
