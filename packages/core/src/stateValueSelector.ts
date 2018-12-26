export type StateValueSelector<Model extends object, Value> = (state: Readonly<Model>) => Value;
