import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { CanActivate, GuardResult, MaybeAsync, Router } from "@angular/router";

@Injectable()
export class CanActivateTeam implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): MaybeAsync<GuardResult> {
        if (this.loginService.canActivate) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}