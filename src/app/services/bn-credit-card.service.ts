import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BnCardItemModel } from '../models/bncard/bncard.model';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { BnCreditCardItemModel } from '../models/bncreditcard/bncreditcard.model';

@Injectable({
    providedIn: 'root',
})
export class BnCreditCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    listBnCreditCards(size: number, page: number, body: FilterRequestModel): Observable<ResponseModel<BaseResponseData<BnCreditCardItemModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<BnCreditCardItemModel>>>(this.url + 'api/Bncreditcard' + '?size=' + size + '&from=' + page, body);
    }
}