# JetState 🚀

_Reactive state management with RxJS_

[![NPM Version](https://badge.fury.io/js/%40jetstate%2Fcore.svg)](https://www.npmjs.com/@jetstate/core)
[![Build Status](https://github.com/mnasyrov/jetstate/workflows/nodeci/badge.svg)](https://github.com/mnasyrov/jetstate/actions)
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

## Examples

### Angular project

Install dependencies:

```bash
npm install --save @jetstate/core
```

Usage example:

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
  username$ = this.select(state => state.username);
}

// Separate store updating from components.
@Injectable()
export class UserService {
  constructor(private store: UserStore) {}

  setUserName(username: string) {
    this.store.update({username});
  }
}

// Provide the store, query and service to the app:
@NgModule({
  providers: [UserStore, UserQuery, UserService],
})
export class AppModule {}

// Use the state:
@Component({
  selector: 'User',
  template: `
    {{ message$ | async }}
  `,
})
export class UserComponent {
  constructor(private query: UserQuery, private service: UserService) {}

  message$ = this.query.username$.pipe(map(username => `Hello ${username}!`));

  changeUserName(value: string) {
    this.service.setUserName(value);
  }
}
```

### React project

Install dependencies:

```bash
npm install --save @jetstate/core @jetstate/react
```

Usage example:

```typescript jsx
import {Query, Store} from '@jetstate/core';
import {useObservable} from '@jetstate/react';

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
export class UserQuery extends Query<UserState> {
  username$ = this.select(state => state.username);
}

// Separate store updating from components.
export class UserService {
  constructor(private store: UserStore) {}

  setUserName(username: string) {
    this.store.update({username});
  }
}

// Use the state:
export function UserComponent(props: {query: UserQuery; service: UserService}) {
  const {query, service} = props;

  const username = useObservable(query.username$);

  return (
    <div>
      <h1>Hello {username}!</h1>
      <input
        type="text"
        value={username}
        onChange={event => service.setUserName(event.target.value)}
      />
    </div>
  );
}
```

## License

[MIT](LICENSE)
