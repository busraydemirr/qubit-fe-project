import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { TimePeriodEnum } from '../models/shared/time-period.enum';
import { OrficheModel } from '../models/orfiche/orfiche.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { OrficheLineModel } from '../models/orfiche/orfiche-line.model';

@Injectable({
    providedIn: 'root',
})
export class OrficheService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listPlacedOrfiche(size: number, from: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<OrficheModel>>> {
        const codeFilter = {
            field: 'trcode',
            value: '2', // verilen siparişler
            operator: 'eq',
        };
        let newFilter = {};
        if (filter?.filter) {
            newFilter =
            {
                filter: {
                    ...filter.filter,
                    logic: 'and',
                    filters: filter.filter.filters ? [...filter.filter.filters, codeFilter] : [codeFilter]
                }
            }
        } else {
            newFilter = {
                filter: codeFilter
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<OrficheModel>>>(this.url + 'api/Orfiche?size=' + size + '&from=' + from + '&term=' + term, newFilter);
    }

    public listReceivedOrfiche(size: number, from: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<OrficheModel>>> {
        const codeFilter = {
            field: 'trcode',
            value: '1', // alınan siparişler
            operator: 'eq',
        };
        let newFilter = {};
        if (filter?.filter) {
            newFilter =
            {
                filter: {
                    ...filter.filter,
                    logic: 'and',
                    filters: filter.filter.filters ? [...filter.filter.filters, codeFilter] : [codeFilter]
                }
            }
        } else {
            newFilter = {
                filter: codeFilter
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<OrficheModel>>>(this.url + 'api/Orfiche?size=' + size + '&from=' + from + '&term=' + term, newFilter);
    }


    public listOrfiches(size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<OrficheModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<OrficheModel>>>(this.url + 'api/Orfiche' + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public getOrficheLines(id: number, size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<OrficheLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<OrficheLineModel>>>(this.url + 'api/Orfiche/' + id + '/getOrfLines?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public getTotalOrfiche(timePeriod: TimePeriodEnum): Observable<ResponseModel<{ totalAmountReceivedOrder: number, totalAmountPlacedOrder: number }>> {
        return this._http.post<ResponseModel<{ totalAmountReceivedOrder: number; totalAmountPlacedOrder: number }>>(this.url + 'api/Orfiche/getTotalOrfiche?size=100&from=0' + '&timePeriod=' + timePeriod, {});
    }
}