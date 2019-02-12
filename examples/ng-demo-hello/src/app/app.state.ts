import {JetState, JetStateDefaults, JetStateKey} from '@jetstate/angular';

export interface AppStateModel {
    userName: Readonly<string>;
    isUpperCase: Readonly<boolean>;
}

@JetStateKey('AppState')
@JetStateDefaults<AppStateModel>({
    userName: 'World',
    isUpperCase: false
})
export class AppState extends JetState<AppStateModel> {}
