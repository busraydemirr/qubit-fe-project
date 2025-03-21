import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[BnCreditCard]';

export namespace BnCreditCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel; }) { }
    }
}