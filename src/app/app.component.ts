import {Component} from '@angular/core';
import { UserService } from './services/user.service';
//import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/LocalStorageEmitter';
@Component({
    selector: 'my-app',
    templateUrl: '/dist/app/app.component.html',
    providers: [UserService]
})

export class AppComponent {
    private isAuth: Boolean;
    constructor(private user: UserService) {
        this.isAuth = false;
        //if (this.isAuth) {
        //    this.user = this.auth.getUser();
        //}
        //this.username = '';
        //this.password = '';
    }
    login() {
        //event.preventDefault();
        this.user.login('lok', 'ok').subscribe((result) => {
            console.log(result);
            this.isAuth =  result;
        });
    }

    logout() {
        this.isAuth =  false;
    }
}
