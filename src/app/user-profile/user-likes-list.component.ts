import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Post } from '../_models/post';
import { PostsService, UserService } from '../_services/index';

@Component({
  selector: 'app-user-likes-list',
  templateUrl: './user-likes-list.component.html',
  styleUrls: ['./user-likes-list.component.css']
})
export class UserLikesListComponent implements OnInit {
  private currentUsername: string;
  likedPosts: Post[];

  constructor(
    private router: Router,
    private postsService: PostsService,
    private userService: UserService) {
    this.currentUsername = userService.currentUser();
  }

  ngOnInit() {
    this.userService.getUserLikes(this.currentUsername)
      .subscribe(
      userWithLikes => {
        this.likedPosts = userWithLikes.likes;
      },
      error => {
        console.log('error');
      });
  }

  onSelect(post) {
    this.router.navigate(['/post', post._id]);
  }

}
