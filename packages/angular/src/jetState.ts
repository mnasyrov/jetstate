import {SimpleChanges} from '@angular/core';
import {StateValueSelector} from '@jetstate/core';
import {MutableJetProjectionProxy} from './internal/mutableJetProjectionProxy';
import {RxState} from './internal/rxState';
import {JetProjection} from './jetProjection';
import {JetProjectionBuilder} from './jetProjectionBuilder';
import {MutableJetProjection} from './mutableJetProjection';

/** @experimental */
export type NgComponentInputMapper<Component, Model> = {
    [inputKey in keyof Component]?: (value: Component[inputKey]) => Partial<Readonly<Model>> | undefined
};

export class JetState<Model extends object> extends RxState<Model> {
    static readonly compute = JetProjectionBuilder.from;

    static mutable<V>(projection: JetProjection<V>, setter: (value: V) => any): MutableJetProjection<V> {
        return new MutableJetProjectionProxy(projection, setter);
    }

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

    pickMutable<V>(
        selector: StateValueSelector<Model, V>,
        patcher: (value: V) => Partial<Model> | undefined | void
    ): MutableJetProjection<V> {
        const projection = this.pick(selector);
        return new MutableJetProjectionProxy(projection, (value: V) => {
            const newState = patcher(value);
            if (newState) {
                this.patch(newState);
            }
        });
    }

    /** @experimental */
    patchByNgChanges<Component>(changes: SimpleChanges, inputs: NgComponentInputMapper<Component, Model>) {
        let newState: Model | undefined;
        const inputKeys = Object.getOwnPropertyNames(inputs);
        for (const inputKey of inputKeys) {
            const change = changes[inputKey];
            const patchCallback = (inputs as any)[inputKey];
            if (!change || !patchCallback) {
                continue;
            }
            const stateUpdate = patchCallback(change.currentValue);
            if (stateUpdate) {
                newState = Object.assign(newState || {}, stateUpdate);
            }
        }
        if (newState) {
            this.patch(newState);
        }
    }
}
