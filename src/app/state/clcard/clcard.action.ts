const ACTION_SCOPE = '[ClCard]';

export namespace ClCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: any}) { }
    }
}