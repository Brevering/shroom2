import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public token: string;
    private subject = new Subject<any>();

    constructor(private http: Http) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
     }

    login(username: string, password: string): Observable<any> {
        let headers = new Headers();
        headers.append('content-type', 'application/json');

        return this.http.post(
            '/api/authenticate',
            JSON.stringify({ username: username, password: password }),
            { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // notify any subscribers of successful login via observable subject
                    this.subject.next({ username: username });

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');

        // notify any subscribers of logout via observable subject
        this.subject.next();


    }

    getStatus(): Observable<any> {
        // return observable to be notified of status updates (login/logout)
        return this.subject.asObservable();
    }
}
