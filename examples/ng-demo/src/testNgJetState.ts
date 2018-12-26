import {JetState, JetStateDescriptor} from '@jetstate/angular';

export interface TestNgJetStateModel {
    foo: Readonly<string>;
}

@JetStateDescriptor<TestNgJetStateModel>({
    key: 'TestNgJetState',
    defaults: {
        foo: 'bar'
    }
})
export class TestNgJetState extends JetState<TestNgJetStateModel> {
    constructor() {
        super();
    }
}
