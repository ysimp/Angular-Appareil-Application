import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth= false;

 appareils :any[];
 appareilSubscription : Subscription;

 //Simule le fait d'aller chercher une donné dans un backend 
 //Promise pour dire que la donné va venir 
 lastUpdate = new Promise((resolve, reject) =>{
   const date = new Date();

   setTimeout(() => {
     resolve(date)
   }, 2000);
 })

 
 constructor(private appareilService: AppareilService){

  //Mets la variable isAuth a true  u bout de  4 secondes
   setTimeout(
     () => { this.isAuth=true;
     
   }, 4000);
 }

ngOnInit(){

  this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
    (appareils :any[]) =>{
      this.appareils = appareils;
    }
  );
  //
  this.appareilService.emitAppareilSubject();
  //this.appareils = this.appareilService.appareils;
}
 onAllumer(){
  this.appareilService.switchOnAll();
 }

 onEteindre(){
  if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
    this.appareilService.switchOffAll();
  } else {
    return null;
  }
 }

 //Engistrement dans la base donnés
 onSave(){
   this.appareilService.saveAppareilsToServer();
 }

  //Recuperation depuis la base donnés
 onFetch(){
   this.appareilService.getAppareilFromServer();
 }

 //A la destruction de AppareilViewComponent on detruit la subscription
 ngOnDestroy(){
   this.appareilSubscription.unsubscribe();
 }

}
