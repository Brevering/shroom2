import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { POSTS } from '../home/posts-mocked';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post; //of type post
  postId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => { this.postId = +params['id']; });
    // .switchMap((params: Params) => this.service.getPost(+params['id']))
    // .subscribe((post: Post) => this.post = post);
    this.post = POSTS[this.postId - 1];
  }

  public goBack(): void {
    // navigates backward one step in the browser's history stack using the Location service 
    this.location.back();
  }

}
