
import { OrficheModel } from "../../models/orfiche/orfiche.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[Orfiche]';

export namespace OrficheActions {
    export class PlacedOrficheList {
        static readonly type = `${ACTION_SCOPE} Placed Orfiche List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

    export class ReceivedOrficheList {
        static readonly type = `${ACTION_SCOPE} Received Orfiche List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }

    export class SetOrfiche {
        static readonly type = `${ACTION_SCOPE} Set Orfiche`;

        constructor(public payload: OrficheModel) { }
    }

    export class GetOrfiche {
        static readonly type = `${ACTION_SCOPE} Get Orfiche`;

        constructor(public payload: { id: number; term: string }) { }
    }

    export class GetOrficheLines {
        static readonly type = `${ACTION_SCOPE} Get Orfiche Lines`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel, term?: string }) { }
    }
}