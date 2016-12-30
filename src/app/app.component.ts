import { Component, Input, OnInit } from '@angular/core';
import { User } from './_models/index';
import { AuthenticationService } from './_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

    @Input() isToggledOn: boolean = true;

    currentUser: User;

    constructor(private authenticationService: AuthenticationService) {
        // set current user from local storage
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // subscribe to authentication status updates to set and remove the current user on login and logout
        this.authenticationService.getStatus().subscribe(currentUser => this.currentUser = currentUser);
    }
}