import { InvoiceLineModel } from "./invoices/invoice-line.model";
import { InvoiceModel } from "./invoices/invoice.model";

export interface InvoiceStateModel {
    loading: boolean;
    purchaseItems: InvoiceModel[];
    salesItems: InvoiceModel[];
    purchasePage: number;
    purhaseSize: number;
    purchaseTotalElements: number;
    purchasePages: number;
    salesPage: number;
    salesSize: number;
    salesTotalElements: number;
    salesPages: number;
    invoiceDetail: InvoiceModel;
    detailLoading: boolean;
    linesListLoading: boolean;
    invoiceLines: InvoiceLineModel[];
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
}