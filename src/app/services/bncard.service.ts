import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BnCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    listBnCards(size: number, page: number, body: any): Observable<any> {
        return this._http.post(this.url + 'api/BnCard' + '?Size=' + size + '&From=' + page, body);
    }
}