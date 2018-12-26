import {NgModule} from '@angular/core';
import {JetStateModule} from '@jetstate/angular';
import {TestJetState} from './testJetState';
import {TestState} from './testState';

@NgModule({
    providers: [TestState],
    imports: [
        JetStateModule.forRoot({
            descriptors: [TestState.descriptor],
            states: [TestJetState]
        })
    ]
})
export class TestModule {}
