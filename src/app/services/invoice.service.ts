import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { InvoiceModel } from '../models/invoices/invoice.model';
import { InvoiceLineModel } from '../models/invoices/invoice-line.model';
import { TimePeriodEnum } from '../models/shared/time-period.enum';

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listPurchaseInvoices(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<InvoiceModel>>> {
        filter = {
            filter: {
                field: 'grpcode',
                value: '1',
                operator: 'eq',
                ...filter?.filter?.filters ? { filters: filter.filter.filters } : {}
            }
        };
        return this._http.post<ResponseModel<BaseResponseData<InvoiceModel>>>(this.url + 'api/Invoice' + '?size=' + size + '&from=' + page, filter);
    }

    public listSalesInvoices(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<InvoiceModel>>> {
        filter = {
            filter: {
                field: 'grpcode',
                value: '2',
                operator: 'eq',
                ...filter?.filter?.filters ? { filters: filter.filter.filters } : {}
            }
        };
        return this._http.post<ResponseModel<BaseResponseData<InvoiceModel>>>(this.url + 'api/Invoice' + '?size=' + size + '&from=' + page, filter);
    }

    public listInvoices(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<InvoiceModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<InvoiceModel>>>(this.url + 'api/Invoice' + '?size=' + size + '&from=' + page, filter);
    }

    public getInvoiceLines(id: number, size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<InvoiceLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<InvoiceLineModel>>>(this.url + 'api/Invoice/' + id + '/getStLines?size=' + size + '&from=' + page, filter);
    }

    public getTotalInvoice(timePeriod: TimePeriodEnum): Observable<ResponseModel<{ totalAmountPurchaseInvoice: number, totalAmountSalesInvoice: number }>> {
        return this._http.post<ResponseModel<{ totalAmountPurchaseInvoice: number; totalAmountSalesInvoice: number }>>(this.url + 'api/Invoice/getTotalInvoice?size=100&from=0' + '&timePeriod=' + timePeriod, {});
    }
}