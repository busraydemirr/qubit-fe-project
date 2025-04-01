import { BnCardItemModel } from "../../models/bncard/bncard.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[BnCard]';

export namespace BnCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel; }) { }
    }

    export class SetBnCard {
        static readonly type = `${ACTION_SCOPE} Set BnCard`;

        constructor(public payload: BnCardItemModel) { }
    }

    export class GetBnCard {
        static readonly type = `${ACTION_SCOPE} Get BnCard`;

        constructor(public payload: number) { }
    }

    export class GetBnCardAccounts {
        static readonly type = `${ACTION_SCOPE} Get BnCard Accounts`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel }) { }
    }

    export class AccountLineList {
        static readonly type = `${ACTION_SCOPE} Account Line List`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel }) { }
    }
}