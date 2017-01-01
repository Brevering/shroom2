import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { User, News } from '../_models/index';
import { UserService, NewsService, AlertService } from '../_services/index';


@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    loading = false;
    currentUser: User;
    users: User[] = [];
    news: News[] = [];

    newsModel: any = {};

    constructor(
        private router: Router,
        private alertService: AlertService,
        private userService: UserService,
        private newsService: NewsService) {
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
                this.alertService.success('Article Created!');
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
