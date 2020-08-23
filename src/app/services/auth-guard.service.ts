import {ActivatedRouteSnapshot,CanActivate, RouterStateSnapshot, Router} from '@angular/router'
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor (private authService : AuthService, private router: Router){}

    canActivate(
        route : ActivatedRouteSnapshot,
        state  : RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {

        //Implementation de la logique
        if(this.authService.isAuth){
            return true;
        }
        else{
            //redirection vers la route auth
            this.router.navigate(['auth'])
        }
    }

}