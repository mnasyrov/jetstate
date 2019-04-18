import {JetState, JetStateDefaults} from '@jetstate/angular';

export interface AppStateModel {
    userName: Readonly<string>;
    isUpperCase: Readonly<boolean>;
}

@JetStateDefaults<AppStateModel>({
    userName: 'World',
    isUpperCase: false
})
export class AppState extends JetState<AppStateModel> {}
