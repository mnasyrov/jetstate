import {Injectable} from '@angular/core';
import {StateAccessor, StateDeclaration, Store} from 'jetstate';

export interface TestStateModel {
    foo: Readonly<string>;
}


@Injectable()
export class TestState extends StateAccessor<TestStateModel> {
    static readonly stateDeclaration: StateDeclaration<TestStateModel> = {
        key: 'TestState',
        defaults: {
            foo: 'bar'
        }
    };

    constructor(store: Store) {
        super(store.getContextOrFail(TestState.stateDeclaration));
    }
}
