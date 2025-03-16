import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClCardService {
    public url: string = "http://localhost:5063/";

    constructor(private _http: HttpClient) { }

    listClCards(size: number, page: number, filter: any): Observable<any> {
        return this._http.post(this.url + 'api/ClCard' + '?Size=' + size + '&From=' + page, filter);
    }

    getClCard() { }
}