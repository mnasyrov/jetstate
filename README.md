# JetState 🚀 

_Clean State Management for Angular and RxJS._

[![Build Status](https://travis-ci.org/mnasyrov/jetstate.svg?branch=master)](https://travis-ci.org/mnasyrov/jetstate)
[![npm version](https://badge.fury.io/js/%40jetstate%2Fcore.svg)](https://www.npmjs.com/@jetstate/core)


## Work in progress 🏗

The library is under active development. Its API and docs **will be changed**.


## Why?

JetState is created to fight with bloated solutions by others libs. There are a lot of modern tools for building reactive UI and business logic, e.g. es6 async/await and RxJS. What apps need today is a reactive state which increases productivity of a developer. Write the code, not fight with bloated Flux/Redux patterns. 


## Usage

### Angular project

Install dependencies:

```bash
yarn add @jetstate/angular

# Or: npm install --save @jetstate/angular
```
    

Declare a state:

```typescript
import {JetState, JetStateDescriptor} from '@jetstate/angular';

export interface GreeterStateModel {
    name: Readonly<string>;
}

@JetStateDescriptor<GreeterStateModel>('GreeterState', {
    name: 'World'
})
export class GreeterState extends JetState<GreeterStateModel> {
    static readonly welcomeMessage = (state: GreeterStateModel) => `Hello ${state.name}!`;
}
```


Import `JetStateModule` to an app:

```typescript
import {NgModule} from '@angular/core';
import {JetStateModule} from '@jetstate/angular';
import {GreeterState} from './greeter.state';

@NgModule({
    imports: [
        JetStateModule.forRoot([GreeterState])
    ]
})
export class AppModule {}
``` 


Use the state:

```typescript
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {GreeterState} from './greeter.state';

@Component({
    selector: 'greeter',
    template: `{{message$ | async}}`
})
export class GreeterComponent {
    readonly message$: Observable<string>;
    
    constructor(state: GreeterState) {
        this.message$ = state.select(GreeterState.welcomeMessage); 
    }
}
```


## Development

Tools:

* Node.js: v11
* Yarn: v1.12


Start:

    yarn install
    
    
Building:

    yarn build
    
    
Before commit:
    
    yarn check-commit
    
    
Publish to NPM (for maintainers):

    yarn check-commit
    yarn clean && yarn build
    yarn check-publish
    npm run do-publish --otp=<CODE>
