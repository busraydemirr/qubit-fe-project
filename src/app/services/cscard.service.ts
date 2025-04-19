import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseData, ResponseModel } from '../models/shared/response.model';
import { TimePeriodEnum } from '../models/shared/time-period.enum';

@Injectable({
    providedIn: 'root',
})
export class CsCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    public getPromissoryNote(timePeriod: TimePeriodEnum): Observable<ResponseModel<BaseResponseData<any>>> {
        return this._http.post<ResponseModel<BaseResponseData<any>>>(this.url + 'api/CsCard/getPromissoryNote' + '?timePeriod=' + timePeriod, {});
    }
}