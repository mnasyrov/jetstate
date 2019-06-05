import {ModuleWithProviders, NgModule} from '@angular/core';
import {JetProjectionPipe} from './jetProjectionPipe';
import {JetState} from './jetState';

type JetStateConstructor<Model extends object> = new (defaults?: any) => JetState<Model>;

@NgModule({
    declarations: [JetProjectionPipe],
    exports: [JetProjectionPipe]
})
export class JetStateModule {
    static forRoot(states: JetStateConstructor<any>[] = []): ModuleWithProviders {
        return {
            ngModule: JetStateModule,
            providers: [states]
        };
    }
}
