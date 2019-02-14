import {StateValueSelector} from '@jetstate/core';
import {RxState} from './internal/rxState';
import {JetProjection} from './jetProjection';
import {JetProjectionBuilder} from './jetProjectionBuilder';

export class JetState<Model extends object> extends RxState<Model> {
    static readonly compute = JetProjectionBuilder.from;

    static create<Model extends object>(defaults?: Readonly<Model>): JetState<Model> {
        const state = new JetState<Model>();
        if (defaults) {
            state.reset(defaults);
        }
        return state;
    }

    constructor() {
        super();
    }

    pick<V>(selector: StateValueSelector<Model, V>): JetProjection<V> {
        return super.pick(selector);
    }
}
