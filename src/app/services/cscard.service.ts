import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { TimePeriodEnum } from '../models/shared/time-period.enum';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { CsCardModel } from '../models/cscard/cscard.model';
import { CsCardLineModel } from '../models/cscard/cscard-line.model';

@Injectable({
    providedIn: 'root',
})
export class CsCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public getPromissoryNote(timePeriod: TimePeriodEnum): Observable<ResponseModel<any>> {
        return this._http.post<ResponseModel<BaseResponseData<any>>>(this.url + 'api/CsCard/getPromissoryNote?size=100&from=0' + '&timePeriod=' + timePeriod, {});
    }

    public listCekCard(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardModel>>> {
        const docFilter = {
            field: 'doc',
            value: '1',
            operator: 'eq',
        };
        let newFilter = {};
        if (filter?.filter) {
            newFilter =
            {
                filter: {
                    ...filter.filter,
                    logic: 'and',
                    filters: filter.filter.filters ? [...filter.filter.filters, docFilter] : [docFilter]
                }
            }
        } else {
            newFilter = {
                filter: {
                    field: 'doc',
                    value: '1',
                    operator: 'eq',
                }
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<CsCardModel>>>(this.url + 'api/CsCard' + '?size=' + size + '&from=' + page + '&term=' + term, newFilter);
    }

    public listPimakCard(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardModel>>> {
        const docFilter = {
            field: 'doc',
            value: '3',
            operator: 'eq',
        };
        let newFilter = {};

        if (filter?.filter) {
            newFilter =
            {
                filter: {
                    ...filter.filter,
                    logic: 'and',
                    filters: filter.filter.filters ? [...filter.filter.filters, docFilter] : [docFilter]
                }
            }
        } else {
            newFilter = {
                filter: docFilter
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<CsCardModel>>>(this.url + 'api/CsCard' + '?size=' + size + '&from=' + page + '&term=' + term, newFilter);
    }

    public listCsCards(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<CsCardModel>>>(this.url + 'api/CsCard' + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public getCsCardLines(id: number, size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<CsCardLineModel>>>(this.url + 'api/CsCard/' + id + '/getCsTrans?size=' + size + '&from=' + page + '&term=' + term, filter);
    }
}