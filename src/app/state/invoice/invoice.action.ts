import { InvoiceModel } from "../../models/invoices/invoice.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

const ACTION_SCOPE = '[Invoice]';

export namespace InvoiceActions {
    export class PurchaseInvoiceList {
        static readonly type = `${ACTION_SCOPE} Purchase Invoice List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel }) { }
    }

    export class SalesInvoiceList {
        static readonly type = `${ACTION_SCOPE} Sales Invoice List`;

        constructor(public payload: { size: number; page: number; filter: FilterRequestModel }) { }
    }

    export class SetInvoice {
        static readonly type = `${ACTION_SCOPE} Set Invoice`;

        constructor(public payload: InvoiceModel) { }
    }

    export class GetInvoice {
        static readonly type = `${ACTION_SCOPE} Get Invoice`;

        constructor(public payload: number) { }
    }

    export class GetInvoiceLines {
        static readonly type = `${ACTION_SCOPE} Get Invoice Lines`;

        constructor(public payload: { id: number; size: number; page: number; filter: FilterRequestModel }) { }
    }
}