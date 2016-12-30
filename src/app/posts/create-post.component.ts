import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// this needs refactoring
import { UserService, NewsService, AlertService } from '../_services/index';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  newsModel: any = {};

  constructor(
    private router: Router,
    private newsService: NewsService,
    private alertService: AlertService,
    private x: UserService) { }

  ngOnInit() {
  }

  create() {
    this.newsService.createNews(this.newsModel)
      .subscribe(
      data => {
        this.alertService.success('Article Created!');
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error(error);
      });
  }
  reset() {
    let resetForm = <HTMLFormElement>document.getElementById('post-create');
    resetForm.reset();
  }
}

