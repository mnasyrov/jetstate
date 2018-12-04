import {NgModule} from '@angular/core';
import {JetStateModule} from '@jetstate/angular';
import {TestState} from './test.state';

@NgModule({
    imports: [JetStateModule.forRoot([TestState.stateDeclaration])],
    providers: [TestState]
})
export class TestModule {}
