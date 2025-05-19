import { ClCardItemModel } from "../../models/clcard/clcard.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[ClCard]';

export namespace ClCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel, term?: string }) { }
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

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

     export class GetClCardLines2 {
        static readonly type = `${ACTION_SCOPE} Get ClCard Lines 2`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

     export class GetClCardLines1 {
        static readonly type = `${ACTION_SCOPE} Get ClCard Lines 1`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

    export class GetClCardTotals {
        static readonly type = `${ACTION_SCOPE} Get ClCard Totals`;

        constructor(public payload: number) { }
    }
}