declare namespace __WebpackModuleApi {
    interface RequireContext {
        keys(): string[];
        (id: string): string;
        resolve(id: string): string;
        id: string;
    }
}

interface NodeRequire {
    context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => __WebpackModuleApi.RequireContext;
}
