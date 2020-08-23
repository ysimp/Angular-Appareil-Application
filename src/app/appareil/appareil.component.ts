import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  //@Input()  Permet qu'on modifie la variable dans un autre composant
  @Input() appareilName :string ;
  @Input() appareilStatus :string ;
  @Input() indexOfAppareil : number;
  @Input() id : number;

  //AppareilStatus = 'eteint'
  constructor(private appareilService : AppareilService) { }

  ngOnInit() {
  }

  getStatus(){
   return this.appareilStatus;
  }

  getColor(){

    if(this.appareilStatus === 'éteint'){
      return 'red';
    }
    else if(this.appareilStatus === 'allumer'){
      return 'green';
    }
  }

  switchOnOne(){
    this.appareilService.switchOnOne(this.indexOfAppareil)
  }

  switchOffOne(){
    this.appareilService.switchOffOne(this.indexOfAppareil)
  }

}
