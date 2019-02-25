import {State} from '../state';
import {mergeProjections} from './mergeProjections';

describe('function mergeProjections()', () => {
    it('should return a projection which can be map to another value', () => {
        const state = new State({x: 1});
        const y = mergeProjections(x => x + 1, state.pick(it => it.x));
        const z = y.map(value => value * 2);

        expect(z.value).toEqual(4);

        state.patch({x: 2});
        expect(z.value).toEqual(6);
    });
});
