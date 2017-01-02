import { Component, OnInit, trigger, state, style, animate, transition } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { PostsService, UserService } from '../_services/index';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    host: {
        '[@routeAnimation]': 'true',
        '[style.display]': "'block'",
    },
    animations: [
        trigger('routeAnimation', [
            state('*', style({ transform: 'translateX(0)', opacity: 1 })),
            transition('void => *', [
                style({ transform: 'translateY(-100%)', opacity: 0 }),
                animate(300)
            ]),
            transition('* => void', animate(300, style({ transform: 'translateY(100%)', opacity: 0 })))
        ])
    ]
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
        this.userService.getCounts(this.currentUsername)
            .subscribe(
            counts => {
                //console.log(counts);
                this.postsCount = counts[0].postsCount;
                this.likesCount = counts[0].likesCount;
            },
            error => {
                console.log('error');
            });

        //this.router.navigate(['my-likes', { relativeTo: this.activeRoute }]);
    }

}
