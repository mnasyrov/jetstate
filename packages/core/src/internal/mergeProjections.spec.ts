import {State} from '../state';
import {mergeProjections} from './mergeProjections';

describe('function mergeProjections()', () => {
    it('should return a projection which can be map to another value', () => {
        const state = new State({x: 1});
        const x = state.pickMutable(it => it.x, value => ({x: value}));
        const y = mergeProjections(value => value + 1, x);
        const z = y.map(value => value * 2);

        expect(z.value).toEqual(4);

        x.setValue(2);
        expect(z.value).toEqual(6);
    });
});
