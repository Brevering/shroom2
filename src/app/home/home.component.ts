import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, News } from '../_models/index';
import { UserService, NewsService } from '../_services/index';


@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    news: News[] = [];

    newsModel: any = {};

    constructor(private userService: UserService, private newsService: NewsService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllNews();
    }


    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }

    private loadAllNews() {
        this.newsService.getAll().subscribe(news => {
            this.news = news;
        });
    }

    create() {
        this.newsService.createNews(this.newsModel)
            .subscribe(
            data => {
                   console.log("success!");
            },
            error => {
                console.log(error);
            });
    }
}
