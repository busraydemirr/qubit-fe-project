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

    public getPromissoryNote(timePeriod: TimePeriodEnum): Observable<ResponseModel<BaseResponseData<any>>> {
        return this._http.post<ResponseModel<BaseResponseData<any>>>(this.url + 'api/CsCard/getPromissoryNote?size=100&from=0' + '&timePeriod=' + timePeriod, {});
    }

    public listCekCard(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardModel>>> {
        filter = {
            filter: {
                field: 'doc',
                value: '1',
                operator: 'eq',
                ...filter?.filter?.filters ? { filters: filter.filter.filters } : {}
            }
        };
        return this._http.post<ResponseModel<BaseResponseData<CsCardModel>>>(this.url + 'api/CsCard' + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public listPimakCard(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardModel>>> {
        filter = {
            filter: {
                field: 'doc',
                value: '3',
                operator: 'eq',
                ...filter?.filter?.filters ? { filters: filter.filter.filters } : {}
            }
        };
        return this._http.post<ResponseModel<BaseResponseData<CsCardModel>>>(this.url + 'api/CsCard' + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public listCsCards(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<CsCardModel>>>(this.url + 'api/CsCard' + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public getCsCardLines(id: number, size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<CsCardLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<CsCardLineModel>>>(this.url + 'api/CsCard/' + id + '/getCsTrans?size=' + size + '&from=' + page + '&term=' + term, filter);
    }
}