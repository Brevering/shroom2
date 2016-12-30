import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new User();
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private location: Location) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        this.alertService.success('Registration successful', true);
      },
      error => {
        if (this.userService.getById(+this.model.id)) {
          this.alertService.error('User already exists', true);
        }
        this.loading = false;
      });
  }

  public goBack(): void {
    // navigates backward one step in the browser's history stack using the Location service 
    this.location.back();
  }

}
