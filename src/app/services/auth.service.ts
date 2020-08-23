import { resolve } from 'url';

export class AuthService{

  isAuth = false;
  
  signIn(){
    //Simulation d'une requette http au bout de 2 secondes
      return new Promise (
        (resolve,reject) =>{
          setTimeout(
            ()=>{
              this.isAuth=true;
              resolve(true);
            }, 2000
          );
        }
      );
  }

  signOut(){
    this.isAuth=false;
  }
}