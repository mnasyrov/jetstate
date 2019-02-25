import {JetState} from './jetState';

describe('JetState', () => {
    describe('method observe()', () => {
        it('should return an observable which passes a current value to each new subscription', async () => {
            const state = new JetState<{foo: number}>();
            state.reset({foo: 1});
            const foo$ = state.observe(it => it.foo);

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
            const foo$ = state.observeChanges(it => it.foo);

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

    describe('static method create()', () => {
        it('should return a new instance of JetState', () => {
            const state = JetState.create();
            expect(state).toBeDefined();
        });

        it('should set default values to the state', () => {
            const state = JetState.create({foo: 1, bar: 'hello'});
            expect(state.getValue(it => it.foo)).toBe(1);
            expect(state.getValue(it => it.bar)).toBe('hello');
        });
    });
});
