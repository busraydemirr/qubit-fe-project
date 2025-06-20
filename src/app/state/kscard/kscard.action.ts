import { KsCardModel } from "../../models/kscard/kscard.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[KsCard]';

export namespace KsCardActions {
    export class List {
        static readonly type = `${ACTION_SCOPE} List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel }) { }
    }

    export class ResetQueryParams {
        static readonly type = `${ACTION_SCOPE} Reset Query Params`;
    }

    export class SetKsCard {
        static readonly type = `${ACTION_SCOPE} Set KsCard`;

        constructor(public payload: KsCardModel) { }
    }

    export class GetKsCard {
        static readonly type = `${ACTION_SCOPE} Get KsCard`;

        constructor(public payload: number) { }
    }

    export class GetKsCardLines {
        static readonly type = `${ACTION_SCOPE} Get KsCard Lines`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }
}