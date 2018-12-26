import {Inject, InjectionToken, Injector, ModuleWithProviders, NgModule, Optional} from '@angular/core';
import {State, StateDescriptor} from '@jetstate/core';
import {getStateDescriptor} from './internal/metadata';
import {JetStore} from './jetStore';

type JetStateConstructor = new (...args: any[]) => object;

export interface JetStateModuleOptions {
    descriptors?: StateDescriptor<any>[];
    states?: JetStateConstructor[];
}

@NgModule()
export class JetStateModule {
    private static readonly OPTIONS_TOKEN = new InjectionToken('JetStateModule.OPTIONS_TOKEN');

    static forRoot(options?: JetStateModuleOptions): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JetStateModule.OPTIONS_TOKEN,
                    useValue: options
                },
                JetStore,
                (options && options.states) || []
            ]
        };
    }

    constructor(
        injector: Injector,
        store: JetStore,
        @Optional() @Inject(JetStateModule.OPTIONS_TOKEN) options?: JetStateModuleOptions
    ) {
        if (!options) {
            return;
        }

        if (options.descriptors) {
            options.descriptors.forEach(decriptor => store.registerState(decriptor));
        }

        if (options.states) {
            options.states.forEach(state => {
                const descriptor = getStateDescriptor(state);
                if (!descriptor) {
                    throw new Error(`Not found a state descriptor for: ${state}`);
                }

                const stateInstance = injector.get(state);
                if (!stateInstance) {
                    throw new Error(`State instance is not provided: ${state}`);
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
}
