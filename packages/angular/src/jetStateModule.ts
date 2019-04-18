import {Inject, InjectionToken, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {State} from '@jetstate/core';
import {getJetStateDefaults} from './internal/metadata';
import {JetProjectionPipe} from './jetProjectionPipe';
import {JetState} from './jetState';

type JetStateConstructor<Model extends object> = new (defaults?: any) => JetState<Model>;

@NgModule({
    declarations: [JetProjectionPipe],
    exports: [JetProjectionPipe]
})
export class JetStateModule {
    private static readonly STATES_TOKEN = new InjectionToken('JetStateModule.STATES_TOKEN');

    static forRoot(states: JetStateConstructor<any>[] = []): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [
                {
                    provide: JetStateModule.STATES_TOKEN,
                    useValue: states
                },
                states
            ]
        };
    }

    /** @experimental */
    static readonly forFeature = JetStateModule.forRoot;

    constructor(injector: Injector, @Inject(JetStateModule.STATES_TOKEN) states: JetStateConstructor<any>[]) {
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

            const stateDefaults = getJetStateDefaults(stateConstructor);
            if (stateDefaults) {
                stateInstance.reset(stateDefaults);
            }
        });
    }
}
