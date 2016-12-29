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
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        }, 2000);

      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  public goBack(): void {
    // navigates backward one step in the browser's history stack using the Location service 
    this.location.back();
  }

}
