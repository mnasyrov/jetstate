# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.1](https://github.com/mnasyrov/jetstate/compare/v0.5.0...v0.5.1) (2020-01-22)

### Bug Fixes

- Exporting 'useProjection() hook. ([960a126](https://github.com/mnasyrov/jetstate/commit/960a126041c16e6a185637d818584db6841ef576))

# [0.5.0](https://github.com/mnasyrov/jetstate/compare/v0.4.3...v0.5.0) (2020-01-22)

### Features

- Introduced 'useProjection()'' hook. ([4f68f81](https://github.com/mnasyrov/jetstate/commit/4f68f81b16761871ce36137877d9e86a08e6cef4))

## [0.4.3](https://github.com/mnasyrov/jetstate/compare/v0.4.2...v0.4.3) (2019-12-04)

**Note:** Version bump only for package jetstate

## [0.4.2](https://github.com/mnasyrov/jetstate/compare/v0.4.1...v0.4.2) (2019-12-01)

**Note:** Version bump only for package jetstate

## [0.4.1](https://github.com/mnasyrov/jetstate/compare/v0.4.0...v0.4.1) (2019-12-01)

**Note:** Version bump only for package jetstate

# [0.4.0](https://github.com/mnasyrov/jetstate/compare/v0.3.5...v0.4.0) (2019-11-14)

### Bug Fixes

- Fixed updating a state. ([64f77a9](https://github.com/mnasyrov/jetstate/commit/64f77a90510d8beedc0a4762050070ef26bc0541))
- Removed `Store.reset()` method. ([234c83c](https://github.com/mnasyrov/jetstate/commit/234c83cd3f299febb5b737ed9721ff08d14f90d0))

## [0.3.5](https://github.com/mnasyrov/jetstate/compare/v0.3.4...v0.3.5) (2019-10-28)

**Note:** Version bump only for package jetstate

## [0.3.4](https://github.com/mnasyrov/jetstate/compare/v0.3.3...v0.3.4) (2019-10-28)

**Note:** Version bump only for package jetstate

## [0.3.3](https://github.com/mnasyrov/jetstate/compare/v0.3.2...v0.3.3) (2019-10-28)

**Note:** Version bump only for package jetstate

## [0.3.2](https://github.com/mnasyrov/jetstate/compare/v0.3.1...v0.3.2) (2019-10-27)

## [0.3.1](https://github.com/mnasyrov/jetstate/compare/v0.3.0...v0.3.1) (2019-10-22)

### Features

- Implemented API for projections. ([48c4fcc](https://github.com/mnasyrov/jetstate/commit/48c4fcc35f549d205055c1c6db32837a2ef29193))
- Projections ([36e58cb](https://github.com/mnasyrov/jetstate/commit/36e58cb84f384981742c4aaa5e5e585e842772a9))

## [0.3.0](https://github.com/mnasyrov/jetstate/compare/v0.0.22...v0.3.0) (2019-10-21)

### Features

- Added `Projection` for a state value. ([ae24b3e](https://github.com/mnasyrov/jetstate/commit/ae24b3ec633af83327fec0370a5f88088a6c28cd))
- Added factory functions for Store and Query. ([140128f](https://github.com/mnasyrov/jetstate/commit/140128ff8ae687d362d0f8628b309f7e136cee9f))
- Added helpers for React.js ([0e01f80](https://github.com/mnasyrov/jetstate/commit/0e01f80ea6f96c93d05c4aa29628257961b23d36))
- New API based on RxJS. ([766dc7c](https://github.com/mnasyrov/jetstate/commit/766dc7c2a0037703d0a57639178528796228d974))
- Simplified API ([c05a2f2](https://github.com/mnasyrov/jetstate/commit/c05a2f2ffdab180aacff0e3e926f8ac765cf98a5))

## [0.0.22](https://github.com/mnasyrov/jetstate/compare/v0.0.21...v0.0.22) (2019-08-16)

## [0.0.21](https://github.com/mnasyrov/jetstate/compare/v0.0.20...v0.0.21) (2019-08-13)

## [0.0.20](https://github.com/mnasyrov/jetstate/compare/v0.0.19...v0.0.20) (2019-08-02)

## [0.0.19](https://github.com/mnasyrov/jetstate/compare/v0.0.18...v0.0.19) (2019-07-30)

### refactor

- Refactored API. ([1e92b0b](https://github.com/mnasyrov/jetstate/commit/1e92b0b))

### BREAKING CHANGES

- - Renamed `mapProjection()` and `computeProjection()` functions to `map()` and `merge()`.

* Refactored `merge()` operation and changed its signature.

## [0.0.18](https://github.com/mnasyrov/jetstate/compare/v0.0.17...v0.0.18) (2019-06-09)

### refactor

- Refactored API. Changed prettier formatting. ([6b70028](https://github.com/mnasyrov/jetstate/commit/6b70028))

### BREAKING CHANGES

- - Removed methods `listen()` and `map()` from `Projection` interface.

* Replaced `ProjectionBuilder` by `mapProjection()` and `computeProjection()` functions.
* Renamed `StateValueSelector` interface to `Selector`.
* `State` implements `Projection` now, refactored its methods.
* Removed `JetStateModule.forRoot()`, import `JetStateModule` instead.
* And other changes.

## [0.0.17](https://github.com/mnasyrov/jetstate/compare/v0.0.16...v0.0.17) (2019-04-18)

### Features

- Changed API of states and projections: separated RxState to @jetstate/rx package. ([002aef2](https://github.com/mnasyrov/jetstate/commit/002aef2))

<a name="0.0.16"></a>

## [0.0.16](https://github.com/mnasyrov/jetstate/compare/v0.0.15...v0.0.16) (2019-02-25)

### Bug Fixes

- Fixed creation of mutable projections. ([c11a49c](https://github.com/mnasyrov/jetstate/commit/c11a49c))

### Features

- Introduced 'jet' angular pipe to bind projections to angular templates. ([9ce0d2c](https://github.com/mnasyrov/jetstate/commit/9ce0d2c))

<a name="0.0.15"></a>

## [0.0.15](https://github.com/mnasyrov/jetstate/compare/v0.0.14...v0.0.15) (2019-02-25)

### Bug Fixes

- Fixed typings for empty `from()` factory method of `ProjectBuilder` and `JetProjectBuilder`. ([d7b7245](https://github.com/mnasyrov/jetstate/commit/d7b7245))

### Features

- Changed API of states and projections. New `Projection.map()` method. Introduced mutable projections. ([b055aa1](https://github.com/mnasyrov/jetstate/commit/b055aa1))

<a name="0.0.14"></a>

## [0.0.14](https://github.com/mnasyrov/jetstate/compare/v0.0.13...v0.0.14) (2019-02-14)

### Bug Fixes

- Added missed declarations for `JetProjection` and `JetProjectionBuilder` to public API. ([f03de4b](https://github.com/mnasyrov/jetstate/commit/f03de4b))

<a name="0.0.13"></a>

## [0.0.13](https://github.com/mnasyrov/jetstate/compare/v0.0.12...v0.0.13) (2019-02-14)

### Features

- Experimental support of patching a state by changes from Angular's component. ([fd99ba4](https://github.com/mnasyrov/jetstate/commit/fd99ba4))
- Introduced computable projections of state values (state compositions). ([167c533](https://github.com/mnasyrov/jetstate/commit/167c533))

<a name="0.0.12"></a>

## [0.0.12](https://github.com/mnasyrov/jetstate/compare/v0.0.11...v0.0.12) (2019-01-25)

### Bug Fixes

- Fixed dependencies between packages (setting right versions during releasing). ([ff67fe0](https://github.com/mnasyrov/jetstate/commit/ff67fe0))

<a name="0.0.11"></a>

## [0.0.11](https://github.com/mnasyrov/jetstate/compare/v0.0.10...v0.0.11) (2019-01-24)

### Bug Fixes

- **core:** Fixed emitting state changes for multiple consumers which are subscribed with the same selector. ([34a2267](https://github.com/mnasyrov/jetstate/commit/34a2267))

<a name="0.0.10"></a>

## 0.0.10 (2019-01-05)

Initial release.
