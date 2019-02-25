import {Component} from '@angular/core';
import {JetStore} from '@jetstate/angular';
import {Observable} from 'rxjs';
import {AppState} from './app.state';

@Component({
    selector: 'app-root',
    template: `
        <h1>JetState Demo</h1>
        <p>
            <label for="userNameInput"> User name: </label>
            <input id="userNameInput" type="text" [ngModel]="userName$ | async" (ngModelChange)="setUserName($event)" />
        </p>
        <p>
            <label for="upperCaseInput"> Transform to upper case: </label>
            <input
                id="upperCaseInput"
                type="checkbox"
                [ngModel]="isUpperCase$ | async"
                (ngModelChange)="setUpperCase($event)"
            />
        </p>
        <p>
            Message: <span id="message">{{ message$ | async }}</span>
        </p>
    `
})
export class AppComponent {
    readonly userName$: Observable<string>;
    readonly isUpperCase$: Observable<boolean>;
    readonly message$: Observable<string>;

    constructor(private readonly state: AppState, private readonly jetStore: JetStore) {
        this.userName$ = state.observe(current => current.userName);
        this.isUpperCase$ = state.observe(current => current.isUpperCase);

        this.message$ = state.observe(current => {
            const value = `Hello ${current.userName}!`;
            return current.isUpperCase ? value.toUpperCase() : value;
        });
    }

    setUserName(value: string) {
        this.state.patch({userName: value});
    }

    setUpperCase(value: boolean) {
        this.state.patch({isUpperCase: value});
    }
}
