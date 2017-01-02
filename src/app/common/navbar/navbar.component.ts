import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

import { User } from '../../_models/index';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  @Input() isHidden: boolean;
  @Input() currentUser: User;
  @Output() onToggleCategoryBox = new EventEmitter<boolean>();

  private isActive: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  ngDoCheck() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
