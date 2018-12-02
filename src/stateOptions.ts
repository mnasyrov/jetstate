export interface StateOptions<StateModel> {
    key: string;
    defaults: Readonly<StateModel>;
}
