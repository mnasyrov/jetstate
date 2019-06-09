# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.18](https://github.com/mnasyrov/jetstate/compare/v0.0.17...v0.0.18) (2019-06-09)


### refactor

* Refactored API. Changed prettier formatting. ([6b70028](https://github.com/mnasyrov/jetstate/commit/6b70028))


### BREAKING CHANGES

* - Removed methods `listen()` and `map()` from `Projection` interface.
- Replaced `ProjectionBuilder` by `mapProjection()` and `computeProjection()` functions.
- Renamed `StateValueSelector` interface to `Selector`.
- `State` implements `Projection` now, refactored its methods.
- Removed `JetStateModule.forRoot()`, import `JetStateModule` instead.
- And other changes.



## [0.0.17](https://github.com/mnasyrov/jetstate/compare/v0.0.16...v0.0.17) (2019-04-18)


### Features

* Changed API of states and projections: separated RxState to @jetstate/rx package. ([002aef2](https://github.com/mnasyrov/jetstate/commit/002aef2))



<a name="0.0.16"></a>
## [0.0.16](https://github.com/mnasyrov/jetstate/compare/v0.0.15...v0.0.16) (2019-02-25)


### Bug Fixes

* Fixed creation of mutable projections. ([c11a49c](https://github.com/mnasyrov/jetstate/commit/c11a49c))


### Features

* Introduced 'jet' angular pipe to bind projections to angular templates. ([9ce0d2c](https://github.com/mnasyrov/jetstate/commit/9ce0d2c))



<a name="0.0.15"></a>
## [0.0.15](https://github.com/mnasyrov/jetstate/compare/v0.0.14...v0.0.15) (2019-02-25)


### Bug Fixes

* Fixed typings for empty `from()` factory method of `ProjectBuilder` and `JetProjectBuilder`. ([d7b7245](https://github.com/mnasyrov/jetstate/commit/d7b7245))


### Features

* Changed API of states and projections. New `Projection.map()` method. Introduced mutable projections. ([b055aa1](https://github.com/mnasyrov/jetstate/commit/b055aa1))



<a name="0.0.14"></a>
## [0.0.14](https://github.com/mnasyrov/jetstate/compare/v0.0.13...v0.0.14) (2019-02-14)


### Bug Fixes

* Added missed declarations for `JetProjection` and `JetProjectionBuilder` to public API. ([f03de4b](https://github.com/mnasyrov/jetstate/commit/f03de4b))



<a name="0.0.13"></a>
## [0.0.13](https://github.com/mnasyrov/jetstate/compare/v0.0.12...v0.0.13) (2019-02-14)


### Features

* Experimental support of patching a state by changes from Angular's component. ([fd99ba4](https://github.com/mnasyrov/jetstate/commit/fd99ba4))
* Introduced computable projections of state values (state compositions). ([167c533](https://github.com/mnasyrov/jetstate/commit/167c533))



<a name="0.0.12"></a>
## [0.0.12](https://github.com/mnasyrov/jetstate/compare/v0.0.11...v0.0.12) (2019-01-25)


### Bug Fixes

* Fixed dependencies between packages (setting right versions during releasing). ([ff67fe0](https://github.com/mnasyrov/jetstate/commit/ff67fe0))



<a name="0.0.11"></a>
## [0.0.11](https://github.com/mnasyrov/jetstate/compare/v0.0.10...v0.0.11) (2019-01-24)


### Bug Fixes

* **core:** Fixed emitting state changes for multiple consumers which are subscribed with the same selector. ([34a2267](https://github.com/mnasyrov/jetstate/commit/34a2267))



<a name="0.0.10"></a>
## 0.0.10 (2019-01-05)

Initial release.
