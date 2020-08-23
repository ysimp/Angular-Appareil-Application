import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService{

appareilSubject = new Subject<any[]>();

private appareils = [];

  /* private appareils = [

        {
        id:1,
        name :'Ampoule',
        status: 'allumer'
       },

        {
        id:2,
        name :'Téléphone',
        status: 'éteint'
       },
     
       {
        id:3,
        name :'Télévision',
        status: 'éteint'
      },
     
      {
        id:4,
        name :'Ordinateur',
        status: 'allumer'
     }
     ];*/

     constructor(private httpClient: HttpClient){

     }

     //Permet d'ajouter un nouveau appareil dans la liste des appareils
     addAppareil(name:string, status:string){
       const appareilObject ={
            id: 0,
            name :'',
            status: ''
        };

        appareilObject.id=this.appareils[this.appareils.length -1 ].id + 1;
        appareilObject.name =name;
        appareilObject.status =status;

        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
     }

     //émission des données (appreils) par le Subject
     //slice permet de faire une copie de appareils
     emitAppareilSubject(){
         this.appareilSubject.next(this.appareils.slice());
     }

     getAppareilById(id:number){
         const appareil =this.appareils.find(
             (appareilObject) => {
                 return appareilObject.id === id
             }
         )
         return appareil;
     }

     //A chaque modification du tableau appareil on envoie les nouvelles données en appelant emit
     switchOnAll(){
         for(let appareil of this.appareils){
             appareil.status ='allumer';
         }
         this.emitAppareilSubject();
     }
     switchOffAll(){
        for(let appareil of this.appareils){
            appareil.status ='éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index :number){
        
           this.appareils[index].status ='allumer';

           this.emitAppareilSubject();
        
    }
    switchOffOne(index :number){
        
        this.appareils[index].status ='éteint';

        this.emitAppareilSubject();
     
 }

 //engistrer dans  la base de données
 saveAppareilsToServer(){
     //la méthode  post() ou put()  retourne un Observable — 
     //elle ne fait pas d'appel à elle toute seule.  C'est en y souscrivant que l'appel est lancé ;
     this.httpClient.put('https://http-client-demo-89db4.firebaseio.com/appareils.json',this.appareils)
     .subscribe(
         //Tout se passe bien
         ()=>{
            console.log("Enrtegistrement terminé")
         },

         //Il y'a erreur
         (error) =>{
            console.log("Erreur !"+ error);
         }
     );
     }

     //Recuperation des données depuis le server
     getAppareilFromServer(){
        this.httpClient.get<any[]>('https://http-client-demo-89db4.firebaseio.com/appareils.json')
        .subscribe(
           (response) =>{
               this.appareils = response;
               this.emitAppareilSubject();
               console.log("Recuperation terminé")
           },

           (error)=>{
            console.log("Erreur !"+ error);
           }
        )
     }
}