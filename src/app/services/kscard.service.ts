import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { KsCardModel } from '../models/kscard/kscard.model';
import { KsCardLineModel } from '../models/kscard/kscard-line.model';

@Injectable({
    providedIn: 'root',
})
export class KsCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listKsCards(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<KsCardModel>>> {
        const activeFilter = {
            field: 'active',
            value: '0',
            operator: 'eq',
        };
        let newFilter = {};
        if (filter?.filter) {
            newFilter =
            {
                filter: {
                    ...filter.filter,
                    logic: 'and',
                    filters: filter.filter.filters ? [...filter.filter.filters, activeFilter] : [activeFilter]
                }
            }
        } else {
            newFilter = {
                filter: activeFilter
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<KsCardModel>>>(this.url + 'api/KsCard' + '?size=' + size + '&from=' + page, newFilter);
    }

    public getKsCardLines(id: number, size: number, page: number, filter: FilterRequestModel, term?: string): Observable<ResponseModel<BaseResponseData<KsCardLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<KsCardLineModel>>>(this.url + 'api/KsCard/getKsCardLines/' + id + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public getKsLine(id: number, term: string): Observable<any> {
        return this._http.get<any>(this.url + 'api/KsCard/KsLine/' + id + '?term=' + term);
    }
    
    public getKsCardById(id: number, term: string): Observable<any> {
        const filter = {
            field: 'id',
            value: id.toString(),
            operator: 'eq',
        };

        return this._http.post<any>(this.url + 'api/KsCard?size=1&from=0&term=' + term, filter);
    }
}