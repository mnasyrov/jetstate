export type StateDeclaration<Model extends object> = Readonly<{
    key: string;
    defaults: Readonly<Model>;
}>;
