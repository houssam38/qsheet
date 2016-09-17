import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})

export class AppComponent {
    constructor() {
        console.log('on');
        //this.auth = true;
        //this.username = '';
        //this.password = '';
    }
    login() {
        console.log('login');
        //event.preventDefault();
        //this.auth.login(username, password).then(() => {
        //    this.router.parent.navigate('/home');
        //})
        //.catch((error) => {
        //    alert(error);
        //});
    }
}
