import {JetState, JetStateDescriptor} from '@jetstate/angular';

export interface AppStateModel {
    userName: Readonly<string>;
    isUpperCase: Readonly<boolean>;
}

@JetStateDescriptor<AppStateModel>('AppState', {
    userName: 'World',
    isUpperCase: false
})
export class AppState extends JetState<AppStateModel> {}
