import {StateOptions} from './stateOptions';

export type StateDeclaration<StateModel> = Readonly<StateOptions<StateModel>>;
