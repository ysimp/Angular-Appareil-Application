import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  name : string = 'Appareil';
  statut : string = 'Statut';
  constructor(private appareilService: AppareilService, 
              private  route: ActivatedRoute ) { }

  ngOnInit() {
    //Permet recuperer le parametre id passé dans l'url
    const id =this.route.snapshot.params['id'];
    //Le +id permet de caster id en number car id  est de type string
    this.name= this.appareilService.getAppareilById(+id).name;
    this.statut= this.appareilService.getAppareilById(+id).status;

  }

}
