import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus : boolean;
  constructor(private authService : AuthService, private router:Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(){
    //Appelle de la méthode ascynchrone
    this.authService.signIn().then(
      ()=>{
        this.authStatus=this.authService.isAuth;
        //Permet la redirection vers apparreils
        //Prends un array comme parametre ici contient un seul élément
        this.router.navigate(['appareils']);
      }
    );
  }

  onSignOut(){
    this.authService.signOut();
    this.authStatus=this.authService.isAuth;
  }

}
