import {State} from './state';

describe('State', () => {
    describe('getter current()', () => {
        it('should return a defined state', () => {
            const state = new State();
            expect(state.current).toBeTruthy();
        });

        it('should return a state', () => {
            const defaults = {foo: 'bar'};
            const state = new State(defaults);
            expect(state.current).toEqual(defaults);
        });

        it('a state must not be equal to defaults', () => {
            const defaults = {foo: 'bar'};
            const state = new State(defaults);
            expect(state.current).not.toBe(defaults);
        });
    });

    describe('method reset()', () => {
        it('should reset to a new state', () => {
            const state = new State({foo: 'bar', xyz: 0});
            state.reset({foo: 'baz', xyz: 1});
            expect(state.current).toEqual({foo: 'baz', xyz: 1});
        });

        it('should reset in case of a partial new state ', () => {
            const state = new State({foo: 'bar', xyz: 0});
            state.reset({foo: 'baz', xyz: 1});
            state.reset({foo: 'abc'} as any);
            expect(state.current).toEqual({foo: 'abc'});
        });

        it('should reset in case a current state has an extra field', () => {
            const state = new State({foo: 'bar', xyz: 0});
            state.patch({extraField: 1} as any);
            state.reset({foo: 'abc'} as any);
            expect(state.current).toEqual({foo: 'abc'});
        });
    });

    describe('method patch()', () => {
        it('should patch a whole state', () => {
            const state = new State({foo: 'bar', xyz: 0});
            state.patch({foo: 'baz', xyz: 1});
            expect(state.current).toEqual({foo: 'baz', xyz: 1});
        });

        it('should patch a partial state', () => {
            const state = new State({foo: 'bar', xyz: 0});
            state.patch({foo: 'baz'});
            expect(state.current).toEqual({foo: 'baz', xyz: 0});
        });

        it('should not modify anything in case a new state is null or undefined', () => {
            const state = new State({foo: 'bar'});
            const expectedState = state.current;

            state.patch(null as any);
            expect(state.current).toBe(expectedState);

            state.patch(undefined as any);
            expect(state.current).toBe(expectedState);
        });
    });

    describe('method listen()', () => {
        it('should attach a listener for a selected value of the state', () => {
            let currentValue = 0;
            const state = new State({foo: 1});
            state.listen(it => it.foo, value => (currentValue = value));
            expect(currentValue).toBe(1);
        });

        it('should return a subscription for the attached listener', () => {
            const state = new State({foo: 1});
            const subscription = state.listen(() => undefined, () => undefined);
            expect(subscription).toBeDefined();
        });

        it('should return a subscription the listener which allow to unsubscribe it', () => {
            const state = new State({foo: 1});
            const changes: number[] = [];
            const subscription = state.listen(it => it.foo, value => changes.push(value));
            state.patch({foo: 2});
            subscription.unsubscribe();
            state.patch({foo: 3});
            expect(changes).toEqual([1, 2]);
        });
    });

    describe('method listenChanges()', () => {
        it('should attach a listener for changes of a selected state value', () => {
            const state = new State({foo: 1});
            const changes: number[] = [];
            state.listenChanges(it => it.foo, value => changes.push(value));
            state.patch({foo: 2});
            expect(changes).toEqual([2]);
        });

        it('should return a subscription for the attached listener', () => {
            const state = new State({foo: 1});
            const subscription = state.listenChanges(() => undefined, () => undefined);
            expect(subscription).toBeDefined();
        });

        it('should return a subscription the listener which allow to unsubscribe it', () => {
            const state = new State({foo: 1});
            const changes: number[] = [];
            const subscription = state.listenChanges(it => it.foo, value => changes.push(value));
            state.patch({foo: 2});
            subscription.unsubscribe();
            state.patch({foo: 3});
            expect(changes).toEqual([2]);
        });
    });

    describe('triggering value listeners with a new state by patch() and reset() methods', () => {
        it('should trigger a listener in case a selected value was changed', () => {
            const state = new State({foo: 1, bar: 0});
            const changes: number[] = [];
            state.listen(it => it.foo, value => changes.push(value));
            state.patch({foo: 1});
            state.patch({foo: 2});
            state.patch({bar: 42});
            state.patch({foo: 2});
            state.patch({foo: 3});
            expect(changes).toEqual([1, 2, 3]);
        });

        it('should keeps pending state patches during applying a current state updates', () => {
            const state = new State({x: 1, y: 0, z: 0});
            const changes: number[] = [];
            state.listen(it => it.x, x => state.patch({y: x * x}));
            state.listen(it => it.y, y => state.patch({z: y * 10}));
            state.listen(it => it.z, z => changes.push(z));
            state.patch({x: 2});
            state.patch({x: 3});
            expect(changes).toEqual([10, 40, 90]);
        });

        it('should keeps pending state resets during applying a current state updates', () => {
            const state = new State({x: 1, y: 0, z: 0});
            const changes: number[] = [];
            state.listen(
                it => it.x,
                x => {
                    state.reset({x: 1, y: x * x, z: 0});
                    state.patch({z: x * x * 10});
                }
            );
            state.listen(it => it.z, z => changes.push(z));
            state.patch({x: 2});
            state.patch({x: 3});
            expect(changes).toEqual([10, 40, 10, 90, 10]);
        });
    });

    describe('triggering value change listener with a new state by patch() and reset() methods', () => {
        it('should trigger a change listener in case a selected value was changed', () => {
            const state = new State({foo: 1, bar: 0});
            const changes: number[] = [];
            state.listenChanges(it => it.foo, value => changes.push(value));
            state.patch({foo: 2});
            state.patch({bar: 42});
            state.patch({foo: 2});
            state.patch({foo: 3});
            expect(changes).toEqual([2, 3]);
        });

        it('should keeps pending state patches during applying a current state updates', () => {
            const state = new State({x: 1, y: 0, z: 0});
            const changes: number[] = [];
            state.listenChanges(it => it.x, x => state.patch({y: x * x}));
            state.listenChanges(it => it.y, y => state.patch({z: y * 10}));
            state.listenChanges(it => it.z, z => changes.push(z));
            state.patch({x: 2});
            state.patch({x: 3});
            expect(changes).toEqual([0, 40, 90]);
        });

        it('should keeps pending state resets during applying a current state updates', () => {
            const state = new State({x: 1, y: 0, z: 0});
            const changes: number[] = [];
            state.listenChanges(
                it => it.x,
                x => {
                    state.reset({x: 1, y: x * x, z: 0});
                    state.patch({z: x * x * 10});
                }
            );
            state.listenChanges(it => it.z, z => changes.push(z));
            state.patch({x: 2});
            state.patch({x: 3});
            expect(changes).toEqual([0, 40, 10, 90, 10]);
        });
    });
});
