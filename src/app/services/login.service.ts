import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "../models/shared/response.model";
import { LoginResponseModel } from "../models/login/login-response.model";
import { LoginRequestModel } from "../models/login/login-request.model";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    public url: string = "http://localhost:5063/";
    public canActivate: boolean = false;

    constructor(private _http: HttpClient) { }

    public login(request: LoginRequestModel): Observable<ResponseModel<LoginResponseModel>> {
        return this._http.post<ResponseModel<LoginResponseModel>>(this.url + 'api/Auth/Login', request);
    }
}