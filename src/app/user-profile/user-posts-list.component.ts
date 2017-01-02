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
  userPosts;

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
        this.userPosts = userWithPosts[0].posts;
      },
      error => {
        console.log('error');
      });
  }

  onDelete(post) {
    this.postsService.deletePost(post._id)
      .subscribe(
      deletedPost =>
        this.userService.removePostFromUserPosts(this.currentUsername, post)
          .subscribe(
          data => {
            let index = this.userPosts.findIndex(p => String(p._id) === String(post._id));
            this.userPosts.splice(index, 1);
          }),
      error => {
        console.log('error');
      });
  }

  onSelect(post) {
    this.router.navigate(['/post', post._id]);
  }
}
