import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { ClCardItemModel } from '../models/clcard/clcard.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { ClCardLineModel } from '../models/clcard/clcard-line.model';
import { ClCardTotalModel } from '../models/clcard/clcard-total.model';

@Injectable({
    providedIn: 'root',
})
export class ClCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listClCards(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<ClCardItemModel>>> {
        const activeFilter = {
            field: 'active',
            value: '0',
            operator: 'eq',
        };

        let newFilter = {};
        if (filter?.filter) {
            newFilter =
            {
                ...filter.sort ? { sort: filter.sort } : {},
                filter: {
                    ...filter.filter,
                    logic: 'and',
                    filters: filter.filter.filters ? [...filter.filter.filters, activeFilter] : [activeFilter]
                }
            }
        } else {
            newFilter = {
                ...filter.sort ? { sort: filter.sort } : {},
                filter: activeFilter
            }
        }
        return this._http.post<ResponseModel<BaseResponseData<ClCardItemModel>>>(this.url + 'api/ClCard/v2' + '?size=' + size + '&from=' + page, newFilter);
    }

    public getClCardLines(id: number, size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<ClCardLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<ClCardLineModel>>>(this.url + 'api/ClCard/getClCardLines/' + id + '?size=' + size + '&from=' + page + '&term=' + term, filter);
    }

    public getClCardTotals(id: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<ClCardTotalModel>> {
        return this._http.post<ResponseModel<ClCardTotalModel>>(this.url + 'api/ClCard/getClCardLinesWithTotal/' + id + '?term=' + term, filter);
    }
}