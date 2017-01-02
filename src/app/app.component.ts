import { Component, Input, Output, OnInit } from '@angular/core';
import { User } from './_models/index';
import { AuthenticationService } from './_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    @Input() isToggledOn: boolean = true;

    @Output() currentUser: User;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // subscribe to authentication status updates to set and remove the current user on login and logout
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.getStatus().subscribe(user => this.currentUser = user);
    }
}