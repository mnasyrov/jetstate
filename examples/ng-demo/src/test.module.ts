import {NgModule} from '@angular/core';
import {JetStateModule} from '@jetstate/angular';
import {TestNgJetState} from './testNgJetState';
import {TestState} from './testState';

@NgModule({
    imports: [
        JetStateModule.forRoot({
            descriptors: [TestState.descriptor],
            states: [TestNgJetState]
        })
    ],
    providers: [TestState]
})
export class TestModule {}
