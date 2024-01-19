export type Mutable<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type WithOptional<T, K extends keyof T> = Partial<T> & Omit<T, K>;

// Use this class to debug complex types
// https://stackoverflow.com/questions/61412688/how-to-view-full-type-definition-on-hover-in-vscode-typescript#answer-76527542
export type Prettify<T> = {
    [K in keyof T]: T[K];
    // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
