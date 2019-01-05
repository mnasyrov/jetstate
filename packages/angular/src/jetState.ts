import {RxState} from './internal/rxState';

export class JetState<Model extends object> extends RxState<Model> {
    constructor() {
        super();
    }
}
