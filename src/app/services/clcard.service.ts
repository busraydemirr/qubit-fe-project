import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { ClCardItemModel } from '../models/clcard/clcard.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { ClCardLineModel } from '../models/clcard/clcard-line.model';

@Injectable({
    providedIn: 'root',
})
export class ClCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listClCards(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<ClCardItemModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<ClCardItemModel>>>(this.url + 'api/ClCard' + '?size=' + size + '&from=' + page, filter);
    }

    public getClCardLines(id: number, size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<ClCardLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<ClCardLineModel>>>(this.url + 'api/ClCard/getClCardLines/' + id + '?size=' + size + '&from=' + page, filter);
    }
}