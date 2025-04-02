import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { KsCardModel } from '../models/kscard/kscard.model';

@Injectable({
    providedIn: 'root',
})
export class KsCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listKsCards(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<KsCardModel>>> {
        console.log('ne');
        return this._http.post<ResponseModel<BaseResponseData<KsCardModel>>>(this.url + 'api/KsCard' + '?size=' + size + '&from=' + page, filter);
    }
}