# JetState 🚀

Reactive state management with RxJS.

[![NPM Version](https://badge.fury.io/js/%40jetstate%2Fcore.svg)](https://www.npmjs.com/@jetstate/core)
[![Build Status](https://github.com/mnasyrov/jetstate/workflows/Node%20CI/badge.svg)](https://github.com/mnasyrov/jetstate/actions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Introduction

JetState is a library for reactive state management and built on top of RxJS. It takes the idea of multiple data stores from Flux, immutable updates from Redux and leverage data streaming by RxJS. In result, it provides observable data store model.

JetState has influenced by [Akita](https://github.com/datorama/akita/). This library is a kind of reimplementation (not fork) of Akita's core API and its pattern, albeit some docs are reused. JetState provides only core features for observable data store pattern and tends to be clean and simple tool.

JetState is framework agnostic, it is more like "M" in your MVVM, MVP and other M?? architecture. Its opinionated structure provides a pattern for managing app's state which can be used in many cases.

```

                           Updates         Data streams
                         +--------> Store --------------+
                         |                              |
                         |                              |
                         |                              v
 Backend API <-----> Service                          Query
                         ^                              |
                         |                              |
                         |                              |
                         |                              |
                         +-------- UI Component <-------+
                          Actions               Rendering
                         (methods)

```

## Installation

Install from the NPM repository using npm or yarn:

- `@jetstate/core` 

  Core functionality, framework agnostic. Can be used with Angular as is.

  ```bash
  npm install @jetstate/core
  ```

  ```bash
  yarn add @jetstate/core
  ```

- `@jetstate/react`

  Helpers for React.js to use query's observables in components with hooks.

  ```bash
  npm install @jetstate/react
  ```

  ```bash
  yarn add @jetstate/react
  ```

## Concepts and API

### Store

Store is a single object which contains the store state and serves as the "single source of truth."

To create a store, you need to extend `Store` class, passing the type as well as its initial state.

```typescript
import {Store} from '@jetstate/core';

export interface SessionState {
  token: string;
  name: string;
}

export function createInitialState(): SessionState {
  return {
    token: '',
    name: '',
  };
}

export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
```

With this setup you get a `Store` object with the following interface:

```typescript
import {Observable} from 'rxjs';

interface Store<State extends object> {
  /** Returns a current value of the state */
  readonly state: Readonly<State>;

  /** Returns an observable of state value which pushes a current value first */
  readonly state$: Observable<Readonly<State>>;

  /** Returns an observable of state changes */
  readonly changes$: Observable<Readonly<State>>;

  /** Updates the store by a specified patch object */
  update(patch: Partial<Readonly<State>> | null | undefined): void;

  /** Resets the store to a specified state object */
  reset(state: Readonly<State>): void;
}
```

### Query

Query is a class offering functionality responsible for querying the store.

You can think of the query as being similar to database queries. Its constructor function receives as parameters its own store and possibly other query classes.

Queries can talk to other queries, join entities from different stores, etc.

To create a Query, you need to extend the `Query` class from JetState.

```typescript
import {Query} from '@jetstate/core';

export class SessionQuery extends Query<SessionState> {
  name$ = this.select(state => state.name);

  constructor(store: SessionStore) {
    super(store);
  }
}
```

With this setup you get a `Query` object with the following interface:

```typescript
import {Observable} from 'rxjs';
import {Selector, Projection} from '@jetstate/core';

export interface Query<State extends object> {
  /** Returns a current value of the state */
  readonly state: Readonly<Readonly<State>>;

  /** Returns an observable which pushes the current value first. */
  select<V>(selector: Selector<State, V>): Observable<V>;

  /** Returns a subset of a state. */
  project<V>(selector: Selector<State, V>): Projection<V>;
}
```

Where `Selector` is a function which returns a value from a state. Its type is the following:

```typescript
type Selector<State extends object, V> = (state: Readonly<State>) => V;
```

`Projection` allows to slice a streaming subset of the state:

```typescript
import {Observable} from 'rxjs';

export interface Projection<V> {
  /** A current value */
  readonly value: V;

  /** An observable which pushes the current value first. */
  readonly value$: Observable<V>;

  /** An observable for value changes. */
  readonly changes$: Observable<V>;
}
```

### Service

It is recommended to use a service rather than call the store update methods directly by a component.

```typescript
import {SessionStore} from './sessionStore';
import {tap} from 'rxjs/operators';

export class SessionService {
  constructor(private sessionStore: SessionStore, private http: HttpClient) {}

  login(credentials) {
    return this.http.login(credentials).pipe(
      tap(({name, token}) => {
        this.sessionStore.update({name, token});
      }),
    );
  }
}
```

### Functional utilities

There are a few functions which help to create and use stores and queries in functional way.

```typescript
import {createStore, createQuery, select, project} from '@jetstate/core';

export interface SessionState {
  token: string;
  name: string;
}

const sessionStore = createStore<SessionState>({
  token: '',
  name: '',
});

const sessionQuery = createQuery<SessionState>(sessionStore);
const name$ = sessionQuery.select(state => state.name);

const token$ = select(sessionStore, state => state.token);

const tokenChanges$ = project(sessionStore, state => state.token).changes$;
```

### Best Practices

JetState does not restrict how you structure your code. Instead, it enforces a set of high-level principles:

1. The Store is a single object that contains the store state and serves as the "single source of truth."
2. The only way to change the state is by calling its `update()` or `reset()` methods.
3. A UI component should NOT get data from the store directly but instead use a Query.
4. Asynchronous logic and update calls should be encapsulated in services and data services.

When possible, try to avoid injecting the Query in the service. Instead, use the fact that it's already injected in the component and pass the required data into the service's method by arguments.

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
