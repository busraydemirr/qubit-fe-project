import { ClCardItemModel } from "../../models/clcard/clcard.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[ClCard]';

export namespace ClCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel }) { }
    }

    export class SetClCard {
        static readonly type = `${ACTION_SCOPE} Set ClCard`;

        constructor(public payload: ClCardItemModel) { }
    }

    export class GetClCard {
        static readonly type = `${ACTION_SCOPE} Get ClCard`;

        constructor(public payload: number) { }
    }

    export class GetClCardLines {
        static readonly type = `${ACTION_SCOPE} Get ClCard Lines`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel }) { }
    }
}