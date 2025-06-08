import { BnCreditCardItemModel } from "../../models/bncreditcard/bncreditcard.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[BnCreditCard]';

export namespace BnCreditCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel; }) { }
    }

    export class ResetQueryParams {
        static readonly type = `${ACTION_SCOPE} Reset Query Params`;
    }

    export class SetBnCreditCard {
        static readonly type = `${ACTION_SCOPE} Set BnCreditCard`;

        constructor(public payload: BnCreditCardItemModel) { }
    }

    export class GetBnCreditCard {
        static readonly type = `${ACTION_SCOPE} Get BnCreditCard`;

        constructor(public payload: number) { }
    }

    export class GetBnCreditCardLines {
        static readonly type = `${ACTION_SCOPE} Get BnCreditCard Accounts`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel }) { }
    }
}