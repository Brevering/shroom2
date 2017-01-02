﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User, Post } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/api/users').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getByUsername(username) {
        return this.http.get('http://localhost:3000/api/users/' + String(username))
            .map((res: Response) => res.json());
    }

    create(user: User) {
        return this.http.post('http://localhost:3000/api/signup/', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        let headers = new Headers();
        let token = this.getToken();

        headers.append('content-type', 'application/json');
        headers.append('authorization', token);

        return this.http.post(
            'http://localhost:3000/api/users',
            JSON.stringify(user),
            { headers: headers })
            .map((response: Response) => {
                let updatedUser = response.json();
                if (updatedUser && updatedUser.success) {
                    // update stored user details in local storage
                    let storedUser = JSON.parse(localStorage.getItem('currentUser'));
                    storedUser.user = updatedUser.user;
                    localStorage.setItem('currentUser', JSON.stringify(storedUser));
                }

                return updatedUser;
            });
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    currentUser() {
        return JSON.parse(localStorage.getItem('currentUser')).username;
    }

    addPostToUserLikes(author: string, post: Post) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let bodyToSend = {
            username: author,
            post: post
        };
        return this.http
            .post(`http://localhost:3000/api/users/like`, bodyToSend, options)
            .map((res: Response) => {
                let body = res.json();
                return body.data as User;
            })
            .catch(this.handleError);
    }

    removePostFromUserLikes(author: string, post: Post) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let bodyToSend = {
            username: author,
            post: post
        };

        return this.http
            .post(`http://localhost:3000/api/users/dislike`, bodyToSend, options)
            .map((res: Response) => {
                let body = res.json();
                return body.data as User;
            })
            .catch(this.handleError);
    }

    checkIfLiked(author: string, postId: any) {

        return this.http
            .get(`http://localhost:3000/api/users/like?user=${author}&postid=${postId}`)
            .map((res: Response) => {
                let body = res.json();
                return body.data;
            })
            .catch(this.handleError);
    }

    addPostToUserPosts(author: string, post: Post) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let bodyToSend = {
            username: author,
            post: post
        };

        return this.http
            .post(`http://localhost:3000/api/profile/posts`, bodyToSend, options)
            .map((res: Response) => {
                let body = res.json();
                return body.data as User;
            })
            .catch(this.handleError);
    }

    getUserLikes(author: string) {

        return this.http
            .get(`http://localhost:3000/api/users/like?user=${author}`)
            .map((res: Response) => {
                let body = res.json();
                return body.data;
            })
            .catch(this.handleError);
    }

    getLikesCount(author: string) {

        return this.http
            .get(`http://localhost:3000/api/profile/counts?user=${author}`)
            .map((res: Response) => {
                let body = res.json();
                return body.data;
            })
            .catch(this.handleError);
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    private getToken(): string {
        let storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser).token : null;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
