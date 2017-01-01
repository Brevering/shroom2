import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { PostsService } from '../_services/index';
import { Post } from '../_models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  errorMessage: string;
  post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postsService: PostsService) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => { this.postId = params['id']; });
    // this.activatedRoute.params.subscribe(params => { console.log(params['id']); });

    // this.activatedRoute.params
    // .switchMap((params: Params) => this.postsService.getPostById(params['id']))
    // .subscribe(post => this.post = post, error =>  console.log(error));

    let id = this.activatedRoute.snapshot.params['id'];
    this.postsService
      .getPostById(id)
      .subscribe(po => {
        console.log(po);
        this.post = po;
        console.log(this.post);
      });
  }

  public goBack(): void {
    this.location.back();
  }

}
