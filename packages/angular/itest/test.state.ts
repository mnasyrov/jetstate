import {Injectable} from '@angular/core';
import {StateDeclaration, Store} from '@jetstate/core';
import {RxStateAccessor} from '@jetstate/rxjs';

export interface TestStateModel {
    foo: Readonly<string>;
}

@Injectable()
export class TestState extends RxStateAccessor<TestStateModel> {
    static readonly stateDeclaration: StateDeclaration<TestStateModel> = {
        key: 'TestState',
        defaults: {
            foo: 'bar'
        }
    };

    constructor(store: Store) {
        super(store, TestState.stateDeclaration);
    }
}
