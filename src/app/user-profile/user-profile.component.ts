import { Component, OnInit, trigger, state, style, animate, transition } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(private router: Router, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        // this.navigate('/my-posts');
    }

    // navigate(route: string) {
    //     // if (route.length === 0) {
    //     //     console.log('Hi');
    //     //     console.log(route);
    //     //     this.router.navigateByUrl('/profile');
    //     // }
    //     this.router.navigate([route, { relativeTo: this.activeRoute }]);
    // }

}
