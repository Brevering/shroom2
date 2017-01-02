import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../_models/post';
import { AlertService, PostsService, UserService } from '../_services/index';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  typeOfPosts: string[] = ['text', 'video', 'image', 'audio'];
  typesOfGlyphs: string[] = ['pencil', 'facetime-video', 'picture', 'cd'];

  // take from CategoryService
  categories: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];

  isTypeSelected: boolean = false;
  post: any = {};

  constructor(
    private router: Router,
    private postsService: PostsService,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {
    //get categories
  }

  onToggle() {
    this.isTypeSelected = !this.isTypeSelected;
    console.log(this.post.type);
  }

  create() {
    this.post.author = this.userService.currentUser();
    this.postsService.createPost(this.post)
      .subscribe(
      createdPost => {
        this.alertService.success('Article Created!');
        // userService.addPostToUser(this.post.author, this.post)
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error(error);
      });
  }
}

