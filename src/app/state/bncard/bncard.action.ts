const ACTION_SCOPE = '[BnCard]';

export namespace BnCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: any; }) { }
    }
}