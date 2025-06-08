import { CsCardModel } from "../../models/cscard/cscard.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[CsCard]';

export namespace CsCardActions {
    export class CsCardCekList {
        static readonly type = `${ACTION_SCOPE} CsCArd Cek List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

    export class CsCardPimakList {
        static readonly type = `${ACTION_SCOPE} CsCard Pimak List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

    export class SetCsCard {
        static readonly type = `${ACTION_SCOPE} Set CsCard`;

        constructor(public payload: CsCardModel) { }
    }

    export class GetCsCard {
        static readonly type = `${ACTION_SCOPE} Get CsCard`;

        constructor(public payload: { id: number, term?: string }) { }
    }

    export class GetCsCardLines {
        static readonly type = `${ACTION_SCOPE} Get CsCard Lines`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel; term?: string }) { }
    }

    export class ResetPimakQueryParams {
        static readonly type = `${ACTION_SCOPE} Reset Pimak Query Params`;
    }

    export class ResetCustomerQueryParams {
        static readonly type = `${ACTION_SCOPE} Reset Customer Query Params`;
    }
}