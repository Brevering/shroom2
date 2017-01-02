import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { PostsService, UserService } from '../_services/index';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
    private currentUsername: string;
    postsCount: number;
    likesCount: number;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private postsService: PostsService,
        private userService: UserService) {
        this.currentUsername = userService.currentUser();
    }

    ngOnInit() {
        this.userService.getLikesCount(this.currentUsername)
            .subscribe(
            counts => {
                console.log(counts);
                this.postsCount = counts[0].postsCount;
                this.likesCount = counts[0].likesCount;
            },
            error => {
                console.log('error');
            });

        //this.router.navigate(['my-likes', { relativeTo: this.activeRoute }]);
    }

}
