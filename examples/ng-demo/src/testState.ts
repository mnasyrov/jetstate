import {Injectable} from '@angular/core';
import {JetStore} from '@jetstate/angular';
import {State, StateDescriptor} from '@jetstate/core';

export interface TestStateModel {
    foo: Readonly<string>;
}

@Injectable()
export class TestState {
    static readonly descriptor: StateDescriptor<TestStateModel> = {
        key: 'TestState',
        defaults: {
            foo: 'bar'
        }
    };

    private state: State<TestStateModel>;

    constructor(store: JetStore) {
        this.state = store.getState(TestState.descriptor);
    }

    get foo(): string {
        return this.state.current.foo;
    }

    set foo(value: string) {
        this.state.patch({foo: value});
    }
}
