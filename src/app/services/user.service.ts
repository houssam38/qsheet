// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    private loggedIn = false;

    constructor(private http: Http) {
        this.loggedIn = false;// !!localStorage.getItem('auth_token');
    }

    login(email: String, password: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        console.log('logino');
        return this.http
            .post(
                'http://localhost:8000/api/login',
                JSON.stringify({ email, password }),
                { headers }
            )
            .map((res) => {
                console.log(res);
                if (res.ok) {
                    //localStorage.setItem('auth_token', res.auth_token);
                    this.loggedIn = true;
                }
                return this.loggedIn;
            });
    }

    logout() {
        //localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}