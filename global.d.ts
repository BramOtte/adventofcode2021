export {}
type Awaitable<T> = T | Promise<T>;
declare global {
    interface Context {
        input_str: string,
        html: HTMLElement,
    }
    type To_Solve = (context: Context) => Awaitable<void | {toString():string}>;
    type Solve = [To_Solve, ...string[]][];
}
