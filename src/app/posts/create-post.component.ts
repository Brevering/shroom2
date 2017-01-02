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
  categories: string[] = [
    'Film and Animation',
    'Cars & Vehicles',
    'Music',
    'Pets & Animals',
    'Sports',
    'Travel & Events',
    'Gaming',
    'People & Blogs',
    'Comedy'];

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
  }

  create() {
    this.post.author = this.userService.currentUser();
    this.postsService.createPost(this.post)
      .subscribe(
      createdPost => {
        this.alertService.success('Article Created!');
        this.userService.addPostToUserPosts(this.post.author, createdPost)
          .subscribe(
          updatedUser => {
            this.router.navigate(['/home']);
          },
          error => {
            console.log('Error');
          });

      },
      error => {
        this.alertService.error(error);
      });
  }
}

