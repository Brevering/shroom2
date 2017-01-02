import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { PostsService, UserService } from '../_services/index';
import { Post } from '../_models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  errorMessage: string;
  post;
  isLiked: boolean;
  private currentUsername: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postsService: PostsService,
    private userService: UserService) {
    this.currentUsername = userService.currentUser();
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => { this.postId = params['id']; });
    // this.activatedRoute.params.subscribe(params => { console.log(params['id']); });

    // this.activatedRoute.params
    // .switchMap((params: Params) => this.postsService.getPostById(params['id']))
    // .subscribe(post => this.post = post, error =>  console.log(error));

    // Not a reusable component
    let id = this.activatedRoute.snapshot.params['id'];
    this.postsService
      .getPostById(id)
      .subscribe(post => {
        this.post = post;
      });

    // If current user likes current post
    this.userService.checkIfLiked(this.currentUsername, id)
      .subscribe(
      count => {
        // returns zero if no matches in model.count()
        this.isLiked = Boolean(count);
      },
      error => {
        console.log('Error');
      });
  }

  like() {
    this.userService.addPostToUserLikes(this.currentUsername, this.post)
      .subscribe(
      updatedUser => {
        this.isLiked = true;
      },
      error => {
        console.log('Error');
      });
  }

  dislike() {
    this.userService.removePostFromUserLikes(this.currentUsername, this.post)
      .subscribe(
      updatedUser => {
        this.isLiked = false;
      },
      error => {
        console.log('Error');
      });
  }

  public goBack(): void {
    this.location.back();
  }

}
