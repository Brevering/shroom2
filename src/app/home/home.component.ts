import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../_services/index';
import { Post } from '../_models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private posts: Post[] = [];
  private pageSize: number;
  private currentPage: number = 1;
  private numberOfPages: number;

  @Input() filtertext: string;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.pageSize = 8;
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.numberOfPages = Math.ceil(this.posts.length / this.pageSize);
    });
    this.route.params.map(params => params['page']).subscribe((page) => {if (page) {this.currentPage = page; } });
    if (!this.currentPage){
      this.currentPage = this.route.snapshot.params['page'];
    }
      }

  onSelect(post) {
    this.router.navigate(['/post', post._id]);
  }

   onPageChange(page: number) {
        this.currentPage = this.route.snapshot.params['page'];
    }


}

