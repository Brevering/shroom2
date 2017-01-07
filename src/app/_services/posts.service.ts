import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Post } from '../_models/post';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    // The http.get does not send the request just yet. This observable is cold, which means that the request won't go out until something subscribes to the observable
    return this.http
      .get(`/api/posts`)
      .map((res: Response) => {
        let body = res.json();
        return body.data as Post[];
      })
      .catch(this.handleError);
  }

  getPostById(id: string): Observable<Post> {
    return this.http
      .get(`/api/post/${id}`)
      .map((res: Response) => {
        let body = res.json();
        return body.data as Post;
      })
      .catch(this.handleError);
  }

  createPost(post: Post): Observable<Post> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`/api/posts`, JSON.stringify(post), options)
      .map((res: Response) => {
        let body = res.json();
        return body.data as Post;
      })
      .catch(this.handleError);
  }

  deletePost(id: string): Observable<Post> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .delete(`/api/post/${id}`)
      .map((res: Response) => {
        let body = res.json();
        return body.data as Post;
      })
      .catch(this.handleError);
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
