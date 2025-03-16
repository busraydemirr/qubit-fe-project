import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BnCardItemModel } from '../models/bncard/bncard.model';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';

@Injectable({
    providedIn: 'root',
})
export class BnCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    listBnCards(size: number, page: number, body: FilterRequestModel): Observable<ResponseModel<BaseResponseData<BnCardItemModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<BnCardItemModel>>>(this.url + 'api/BnCard' + '?size=' + size + '&from=' + page, body);
    }
}