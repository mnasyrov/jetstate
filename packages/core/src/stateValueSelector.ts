export type StateValueSelector<StateModel, Value> = (state: Readonly<StateModel>) => Value;
