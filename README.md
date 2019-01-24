# JetState 🚀 

_Clean State Management for Angular and RxJS._

[![npm version](https://badge.fury.io/js/%40jetstate%2Fcore.svg)](https://www.npmjs.com/@jetstate/core)
[![build Status](https://travis-ci.org/mnasyrov/jetstate.svg?branch=master)](https://travis-ci.org/mnasyrov/jetstate)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


## Work in progress 🏗

API and docs **will be changed** – the library is not stable.


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
    userName: Readonly<string>;
}

@JetStateDescriptor<GreeterStateModel>('GreeterState', {
    userName: 'World'
})
export class GreeterState extends JetState<GreeterStateModel> {
}
```


Add the state to an app:

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
    
    constructor(private state: GreeterState) {
        this.message$ = state.select(state => `Hello ${state.userName}!`); 
    }
    
    changeUserName(value: string) {
        this.state.patch({userName: value});
    }
}
```


## Development

Tools:
* [Node.js](https://nodejs.org) v11+
* [Yarn](https://yarnpkg.com) v1.12+

Development scripts:
* `yarn start` – runs a development server in watching mode.
* `yarn lint` – checks source code by static analysis tools.
* `yarn test` – runs unit tests.
* `yarn check-format` – check formatting of source code.
* `yarn format` – formats source code by [prettier](https://prettier.io/) tool.
* `yarn check-commit` – runs all necessary checks, tests and builds to ensure the commit will be green.

Build scripts: 
* `yarn build` – compiles sources.

Release (for maintainers):

```bash
git checkout master; git pull origin master
yarn check-commit
yarn check-release
yarn release
git push --follow-tags origin master

yarn dist-build
yarn check-publish
npm run publish-packages
```

## License

[MIT](LICENSE)
