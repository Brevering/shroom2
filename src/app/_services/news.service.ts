import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { News } from '../_models/news';

@Injectable()
export class NewsService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/api/News').map((response: Response) => response.json());
    }
    createNews(news: News) {
        return this.http.post('http://localhost:3000/api/News', news).map((response: Response) => response.json());
    }
}
