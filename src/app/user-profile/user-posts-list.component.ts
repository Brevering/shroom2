import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Post } from '../_models/post';
import { PostsService, UserService } from '../_services/index';

@Component({
  selector: 'app-user-posts-list',
  templateUrl: './user-posts-list.component.html'
})
export class UserPostsListComponent implements OnInit {
  private currentUsername: string;
  userPosts: Post[];

  constructor(
    private router: Router,
    private postsService: PostsService,
    private userService: UserService) {
    this.currentUsername = userService.currentUser();
  }

  ngOnInit() {
    this.userService.getUserPosts(this.currentUsername)
      .subscribe(
      userWithPosts => {
        this.userPosts = userWithPosts.posts;
      },
      error => {
        console.log('error');
      });
  }

  onSelect(post) {
    this.router.navigate(['/post', post._id]);
  }
}
