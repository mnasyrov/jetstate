# 🚀 JetState 

_Clean State Management for Angular and RxJS._

[![Build Status](https://travis-ci.org/mnasyrov/jetstate.svg?branch=master)](https://travis-ci.org/mnasyrov/jetstate)
[![npm version](https://badge.fury.io/js/%40jetstate%2Fcore.svg)](https://www.npmjs.com/@jetstate/core)


## Work in progress

API and docs are unstable and **will be** changed.


## Installation

Angular project:

    npm install --save @jetstate/angular @jetstate/core @jetstate/rxjs
    
_TODO_


## Usage

_TODO_


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
