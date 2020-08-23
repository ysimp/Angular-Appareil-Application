import { User } from '../models/User.model';
import { Subject } from 'rxjs';

export class UserService{

private users : User[] = [
    new User('Simpara', 'Yaya', 'yaya.simpara@gmail.com', 'jus d\'orange', ['coder', 'boire du café'])
];
userSubject = new Subject<User[]>();

//Permet d'envoyer une copie du tableau users à travers userSubject
emitUsers(){
    this.userSubject.next(this.users.slice());
}

addUser(user : User){
    this.users.push(user);

    this.emitUsers();
}

}