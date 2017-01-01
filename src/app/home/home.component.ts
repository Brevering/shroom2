import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostsService } from '../services/posts.service';
import { Post } from '../shared/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage: string;
  posts: Post[];

  constructor(
    private router: Router,
    private postsService: PostsService) { }

  ngOnInit() {
    this.postsService
    .getPosts()
    .subscribe(posts => this.posts = posts, error =>  this.errorMessage = <any>error);
  }

  onSelect(post) {
    this.router.navigate(['/post', post._id]);
  }


}

