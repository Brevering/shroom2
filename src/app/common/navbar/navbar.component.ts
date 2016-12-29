import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../_models/index';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  @Input() isHidden: boolean;
  @Output() onToggleCategoryBox = new EventEmitter<boolean>();

  private isActive: boolean = false;

  constructor(private authService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  logout() {
        this.authService.logout();
    }

  toggle(categoriesLink: HTMLAnchorElement) {
    this.isActive = !this.isActive;

    if (this.isHidden) {
      categoriesLink.innerHTML = 'Hide categories';
    } else {
      categoriesLink.innerHTML = 'Show categories';
    }

    this.onToggleCategoryBox.emit(!this.isHidden);
  }
}
