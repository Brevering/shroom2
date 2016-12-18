import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    create(username: string, password: string) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');

        return this.http.post(
            'http://localhost:3000/api/signup',
            JSON.stringify({ username: username, password: password }),
            { headers: headers })
            .map((response: Response) => {
                // register and login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    login(username: string, password: string) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');

        return this.http.post(
            'http://localhost:3000/api/authenticate',
            JSON.stringify({ username: username, password: password }),
            { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
