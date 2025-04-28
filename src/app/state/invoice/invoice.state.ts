import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { QueryParams } from "../../models/shared/query-params.model";
import { tap } from "rxjs";
import { InvoiceStateModel } from "../../models/invoice-state.model";
import { InvoiceService } from "../../services/invoice.service";
import { InvoiceModel } from "../../models/invoices/invoice.model";
import { InvoiceLineModel } from "../../models/invoices/invoice-line.model";
import { InvoiceActions } from "./invoice.action";

@State<InvoiceStateModel>({
    name: 'invoice',
    defaults: {
        purchaseItems: [{ id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }],
        salesItems: [{ id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }],
        purchasePage: 0,
        purhaseSize: 10,
        purchaseTotalElements: 0,
        purchasePages: 0,
        salesPage: 0,
        salesSize: 10,
        salesTotalElements: 0,
        salesPages: 0,
        loading: false,
        invoiceDetail: {},
        detailLoading: false,
        linesListLoading: false,
        invoiceLines: [{
            clCardDefinition: '',
            id: 11,
            clientref: 11,
        }, {
            clCardDefinition: '',
            id: 11,
            clientref: 11,
        }, {
            clCardDefinition: '',
            id: 11,
            clientref: 11,
        }],
        linePage: 0,
        lineSize: 10,
        lineTotalElements: 0,
        linePages: 0,
    }
})
@Injectable()
export class InvoiceState {
    constructor(private _invoiceService: InvoiceService) { }

    @Selector()
    static getPurchaseInvoices({ purchaseItems }: InvoiceStateModel): InvoiceModel[] {
        return purchaseItems;
    }

    @Selector()
    static getSalesInvoices({ salesItems }: InvoiceStateModel): InvoiceModel[] {
        return salesItems;
    }

    @Selector()
    static getPurchaseInvoiceQueryParams({ purchasePage, purhaseSize, purchaseTotalElements, purchasePages }: InvoiceStateModel): QueryParams {
        return { page: purchasePage, size: purhaseSize, totalElements: purchaseTotalElements, pages: purchasePages };
    }

    @Selector()
    static getSalesInvoiceQueryParams({ salesPage, salesSize, salesTotalElements, salesPages }: InvoiceStateModel): QueryParams {
        return { page: salesPage, size: salesSize, totalElements: salesTotalElements, pages: salesPages };
    }

    @Selector()
    static getLoading({ loading }: InvoiceStateModel): boolean {
        return loading;
    }

    @Selector()
    static getInvoiceDetail({ invoiceDetail }: InvoiceStateModel): InvoiceModel {
        return invoiceDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: InvoiceStateModel): boolean {
        return detailLoading;
    }

    @Selector()
    static getInvoiceLines({ invoiceLines }: InvoiceStateModel): InvoiceLineModel[] {
        return invoiceLines;
    }

    @Selector()
    static getLinesListLoading({ linesListLoading }: InvoiceStateModel): boolean {
        return linesListLoading;
    }

    @Selector()
    static getInvoiceLineQueryParams({ linePage, lineSize, lineTotalElements, linePages }: InvoiceStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }


    @Action(InvoiceActions.PurchaseInvoiceList)
    listPurchaseInvoices({ patchState }: StateContext<InvoiceStateModel>, action: InvoiceActions.PurchaseInvoiceList) {
        patchState({ loading: true });
        return this._invoiceService.listPurchaseInvoices(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    purchaseItems: data.data.items,
                    purchasePage: data.data.index,
                    purhaseSize: data.data.size,
                    purchaseTotalElements: data.data.count,
                    purchasePages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(InvoiceActions.SalesInvoiceList)
    listSalesInvoices({ patchState }: StateContext<InvoiceStateModel>, action: InvoiceActions.SalesInvoiceList) {
        patchState({ loading: true });
        return this._invoiceService.listSalesInvoices(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    salesItems: data.data.items,
                    salesPage: data.data.index,
                    salesSize: data.data.size,
                    salesTotalElements: data.data.count,
                    salesPages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(InvoiceActions.SetInvoice)
    setInvoice({ patchState }: StateContext<InvoiceStateModel>, action: InvoiceActions.SetInvoice) {
        patchState({ invoiceDetail: action.payload });
    }

    @Action(InvoiceActions.GetInvoice)
    getInvoice({ dispatch, patchState }: StateContext<InvoiceStateModel>, action: InvoiceActions.GetInvoice) {
        const filter = {
            field: 'id',
            value: action.payload.toString(),
            operator: 'eq',
        };
        patchState({ detailLoading: true });
        return this._invoiceService.listInvoices(1, 0, { filter }).pipe(
            tap(data => {
                patchState({ detailLoading: false });
                dispatch(new InvoiceActions.SetInvoice(data.data.items[0]));
            })
        );
    }

    @Action(InvoiceActions.GetInvoiceLines)
    getInvoiceLines({ patchState }: StateContext<InvoiceStateModel>, action: InvoiceActions.GetInvoiceLines) {
        patchState({ linesListLoading: true });
        return this._invoiceService.getInvoiceLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    invoiceLines: data.data.items,
                    linePage: data.data.index,
                    lineSize: data.data.size,
                    lineTotalElements: data.data.count,
                    linePages: data.data.pages,
                    linesListLoading: false
                });
            })
        );
    }

}