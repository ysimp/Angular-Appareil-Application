import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm : FormGroup;

  activeButton : boolean =true;

  constructor( private formBuilder: FormBuilder, private userService: UserService,
               private router: Router ) { }

  ngOnInit() {
    this.initForm();
  }

  //La méthode  group  prend comme argument un objet où les clés correspondent 
  //aux noms des contrôles souhaités et les valeurs correspondent aux valeurs par défaut de ces champs.
  // Puisque l'objectif est d'avoir des champs vides au départ, chaque valeur ici correspond au string vide.
  initForm(){
    this.userForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      drinkPreference : ['', [Validators.required, Validators.email]],
      hobbies : this.formBuilder.array([])
    });
  }

  getHobbies(){
    return this.userForm.get('hobbies') as FormArray ;
  }

  onAddHobby(){
    const newHobby = this.formBuilder.control(null,Validators.required);
    this.getHobbies().push(newHobby);
  }


  onSubmitForm(){

    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] :[]
    );
    
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

}
