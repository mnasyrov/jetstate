export type Selector<Model extends object, Value> = (state: Readonly<Model>) => Value;
