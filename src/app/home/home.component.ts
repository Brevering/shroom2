import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// import post model
import { POSTS } from './posts-mocked';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts;

  constructor(private router: Router) { }

  ngOnInit() {
    this.posts = POSTS;
  }

  onSelect(post) {
    this.router.navigate(['/post', post.id]);
  }


}
