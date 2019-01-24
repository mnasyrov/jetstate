import {JetState} from './jetState';

describe('JetState', () => {
    describe('method select()', () => {
        it('should return an observable which passes a current value to each new subscription', async () => {
            const state = new JetState<{foo: number}>();
            state.reset({foo: 1});
            const foo$ = state.select(it => it.foo);

            let subValue1 = -1;
            foo$.subscribe(value => (subValue1 = value));
            expect(subValue1).toBe(1);

            state.patch({foo: 2});
            let subValue2 = -1;
            foo$.subscribe(value => (subValue2 = value));
            expect(subValue1).toBe(2);
            expect(subValue2).toBe(2);

            state.patch({foo: 3});
            expect(subValue1).toBe(3);
            expect(subValue2).toBe(3);
        });
    });

    describe('method selectChanges()', () => {
        it('should return an observable which passes new changes to each subscription', async () => {
            const state = new JetState<{foo: number}>();
            state.reset({foo: 1});
            const foo$ = state.selectChanges(it => it.foo);

            let subValue1 = -1;
            foo$.subscribe(value => (subValue1 = value));
            expect(subValue1).toBe(-1);

            state.patch({foo: 2});
            let subValue2 = -1;
            foo$.subscribe(value => (subValue2 = value));
            expect(subValue1).toBe(2);
            expect(subValue2).toBe(-1);

            state.patch({foo: 3});
            expect(subValue1).toBe(3);
            expect(subValue2).toBe(3);
        });
    });
});
