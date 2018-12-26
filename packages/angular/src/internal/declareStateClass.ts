import {Type} from '@angular/core';
import {JetState} from '../jetState';
import {defineStateDescriptor} from './metadata';

export function declareStateClass<Model extends object>(key: string, defaults: Readonly<Model>): Type<JetState<Model>> {
    const StateClass = class extends JetState<Model> {};
    defineStateDescriptor(StateClass, {key, defaults});
    return StateClass;
}
