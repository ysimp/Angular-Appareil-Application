import { Component, OnInit, OnDestroy } from '@angular/core';
import { resolve } from 'url';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import { observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  secondes : number;
  counterSubscription : Subscription;
  constructor(){}

  ngOnInit() {

    const counter = Observable.interval(1000);

    this.counterSubscription =counter.subscribe(
    //1ere fonction anonyme se déclenche à chaque fois que l'Observable émet de nouvelles données,
    // et reçoit ces données comme argument 
    (value) =>{
      this.secondes =value;
    },
    //se déclenche si l'Observable émet une erreur, et reçoit cette erreur comme argument
    (error) => {
      console.log("oh oh an error has occured "+ error);
    },
    //se déclenche si l'Observable s'achève, et ne reçoit pas d'argument.
    ()=>{
      console.log("Observable is completed");
    }
  );
  }

  //détruit la souscription et empêche les comportements inattendus liés aux Observables infinis
  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }

}
