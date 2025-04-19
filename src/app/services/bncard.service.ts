import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BnCardItemModel } from '../models/bncard/bncard.model';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { FilterRequestModel } from '../models/shared/filter-request.model';
import { BnCardAccountModel } from '../models/bncard/bncard-account.model';
import { BnCardAccountLineModel } from '../models/bncard/bncard-account-line.model';

@Injectable({
    providedIn: 'root',
})
export class BnCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public listBnCards(size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<BnCardItemModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<BnCardItemModel>>>(this.url + 'api/BnCard' + '?size=' + size + '&from=' + page, filter);
    }

    public getBnCardAccounts(id: number, size: number, page: number, filter: FilterRequestModel): Observable<ResponseModel<BaseResponseData<BnCardAccountModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<BnCardAccountModel>>>(this.url + 'api/BnCard/getBankAccounts/' + id + '?size=' + size + '&from=' + page, filter)
    }

    public getAccountLines(id: number, size: number, page: number, filter: FilterRequestModel, term: string): Observable<ResponseModel<BaseResponseData<BnCardAccountLineModel>>> {
        return this._http.post<ResponseModel<BaseResponseData<BnCardAccountLineModel>>>(this.url + 'api/BnCard/getBankAccountLines/' + id + '?size=' + size + '&from=' + page + '&term=' + term, filter)
    }
}