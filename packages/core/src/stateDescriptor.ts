import {StateDeclaration} from './stateDeclaration';

export type StateDescriptor<Model extends object> = string | StateDeclaration<Model>;
