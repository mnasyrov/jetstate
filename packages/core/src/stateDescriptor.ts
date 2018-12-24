import {StateDeclaration} from './stateDeclaration';

export type StateDescriptor<StateModel> = string | StateDeclaration<StateModel>;
