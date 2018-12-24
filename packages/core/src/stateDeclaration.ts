export type StateDeclaration<StateModel> = Readonly<{
    key: string;
    defaults: Readonly<StateModel>;
}>;
