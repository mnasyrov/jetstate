# JetState 🚀

_Simple State Management with RxJS. Framework agnostic._

[![npm version](https://badge.fury.io/js/%40jetstate%2Fcore.svg)](https://www.npmjs.com/@jetstate/core)
[![build Status](https://travis-ci.org/mnasyrov/jetstate.svg?branch=master)](https://travis-ci.org/mnasyrov/jetstate)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Work in progress 🏗

API and docs **will be changed** – the library is not stable.

## Overview

JetState is a simple library for app's state management. It leverages RxJS to make reactive Flux-like data flow:
```
Store ----> Query ---------+
 ^          |              |
 |          v              v
 +--------- Services <---- UI Components 
```


## Usage

### Angular project

Install dependencies:

```bash
yarn add @jetstate/core

# Or: npm install --save @jetstate/core
```

Declare a state:

```typescript
import {Component, Injectable, NgModule} from '@angular/core';
import {Query, Store} from '@jetstate/core';
import {map} from 'rxjs/operators';

// Declare a state:
export interface UserState {
  userName: string;
}

// Define the store
export class UserStore extends Store<UserState> {
  constructor() {
    super({
      userName: 'World',
    });
  }
}

// Use Query to read data from the store.
@Injectable()
export class UserQuery extends Query<UserState> {
  constructor(store: UserStore) {
    super(store);
  }

  readonly username$ = this.select(state => state.username);
}

// Separate store updating from components.
@Injectable()
export class UserService {
  constructor(private store: UserStore) {}

  setUserName(username: string) {
    this.store.update({username});
  }
}

// Use the state:
@Component({
  selector: 'User',
  template: `
    {{ message$ | async }}
  `,
})
export class UserComponent {
  constructor(private query: UserQuery, private service: UserService) {}

  readonly message$ = this.query.username$.pipe(
    map(username => `Hello ${username}!`),
  );

  changeUserName(value: string) {
    this.service.setUserName(value);
  }
}

// Provide the store, query and service to the app:
@NgModule({
  providers: [UserStore, UserQuery, UserService],
})
export class AppModule {}
```

## Development

Tools:

- [Node.js](https://nodejs.org) v11+
- [Yarn](https://yarnpkg.com) v1.12+

Development scripts:

- `yarn lint` – checks source code by static analysis tools.
- `yarn test` – runs unit tests.
- `yarn check-format` – check formatting of source code.
- `yarn format` – formats source code by [prettier](https://prettier.io/) tool.
- `yarn check-commit` – runs all necessary checks, tests and builds to ensure the commit will be green.

Build scripts:

- `yarn build` – compiles sources.

Release (for maintainers):

```bash
git checkout master; git pull origin master
yarn check-commit
yarn check-release [--release-as X.Y.Z]
yarn release [--release-as X.Y.Z]
git push --follow-tags origin master

yarn dist-build && yarn check-publish
npm run publish-packages
```

## License

[MIT](LICENSE)
