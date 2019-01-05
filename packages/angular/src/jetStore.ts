import {Store} from '@jetstate/core';

export class JetStore extends Store {
    constructor(parentStore?: JetStore) {
        super(parentStore);
    }
}
