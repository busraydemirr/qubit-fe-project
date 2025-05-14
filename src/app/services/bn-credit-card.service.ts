import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BnCardItemModel } from '../models/bncard/bncard.model';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { BnCreditCardItemModel } from '../models/bncreditcard/bncreditcard.model';
import { BnCardAccountLineModel } from '../models/bncard/bncard-account-line.model';
import { TimePeriodEnum } from '../models/shared/time-period.enum';
import moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class BnCreditCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listBnCreditCards(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<BnCreditCardItemModel>>> {
        const value = moment().subtract(7, 'd').toISOString();
        const dateFilter = {
            field: 'enddate',
            value,
            operator: 'gt',
        };
        let newFilter = {};
        if (filter?.filter) {
            newFilter =
            {
                ...filter.filter,
                logic: 'and',
                filters: filter.filter.filters ? [...filter.filter.filters, dateFilter] : [dateFilter]
            }
        } else {
            newFilter = {
                filter: dateFilter
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<BnCreditCardItemModel>>>(this.url + 'api/Bncreditcard' + '?size=' + size + '&from=' + page, newFilter);
    }

    public listBnCreditCardLines(id: number, size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<BnCardAccountLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<BnCardAccountLineModel>>>(this.url + 'api/Bncreditcard/getCreditCardLines/' + id + '?size=' + size + '&from=' + page, filter);
    }

    public getDueCredits(timePeriod: TimePeriodEnum): Observable<ResponseModel<BaseResponseData<any>>> {
        return this._http.post<ResponseModel<BaseResponseData<any>>>(this.url + 'api/Bncreditcard/getDueCredits?size=100&from=0' + '&timePeriod=' + timePeriod, {});
    }
}