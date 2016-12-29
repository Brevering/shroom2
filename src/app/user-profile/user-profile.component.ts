import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
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
