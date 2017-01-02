import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector: 'app-user-profile-update',
    templateUrl: './user-profile-update.html'
})

export class UserProfileUpdateComponent implements OnInit {
    @Input() user: User = new User;
    constructor(
        private http: Http,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        let storageUser = JSON.parse(localStorage.getItem('currentUser'));
        this.user.username = storageUser.username;
    }


    onSubmit() {
        this.userService.update(this.user)
            .subscribe(dbItem => {
                this.user.firstName = dbItem.firstName;
                this.user.lastName = dbItem.lastName;
            });
    }
}
