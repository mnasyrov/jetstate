import {JetState} from '@jetstate/angular';

export interface AppStateModel {
    userName: Readonly<string>;
    isUpperCase: Readonly<boolean>;
}

export class AppState extends JetState<AppStateModel> {
    constructor() {
        super({
            userName: 'World',
            isUpperCase: false
        });
    }
}
