import {JetState, JetStateDescriptor} from '@jetstate/angular';

export interface TestJetStateModel {
    foo: Readonly<string>;
}

@JetStateDescriptor<TestJetStateModel>('TestJetState', {
    foo: 'bar'
})
export class TestJetState extends JetState<TestJetStateModel> {
}
