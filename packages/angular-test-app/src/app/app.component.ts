import {Component} from '@angular/core';
import {JetState} from '@jetstate/angular';
import {computeProjection} from '@jetstate/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>JetState Demo</h1>
    <p>
      <label for="userNameInput"> User name: </label>
      <input
        id="userNameInput"
        type="text"
        [ngModel]="userName | jet"
        (ngModelChange)="setUserName($event)"
      />
    </p>
    <p>
      <label for="upperCaseInput"> Transform to upper case: </label>
      <input
        id="upperCaseInput"
        type="checkbox"
        [ngModel]="isUpperCase | jet"
        (ngModelChange)="setUpperCase($event)"
      />
    </p>
    <p>
      Message: <span id="message">{{ message | jet }}</span>
    </p>
  `
})
export class AppComponent {
  private readonly state = new JetState({
    userName: 'World',
    isUpperCase: false
  });

  readonly userName = this.state.map(it => it.userName);
  readonly isUpperCase = this.state.map(it => it.isUpperCase);
  readonly message = computeProjection([this.userName, this.isUpperCase], () => {
    return createMessage(this.userName.value, this.isUpperCase.value);
  });

  setUserName(value: string) {
    this.state.update({userName: value});
  }

  setUpperCase(value: boolean) {
    this.state.update({isUpperCase: value});
  }
}

function createMessage(userName: string, isUpperCase: boolean): string {
  const result = `Hello ${userName}!`;
  return isUpperCase ? result.toUpperCase() : result;
}
