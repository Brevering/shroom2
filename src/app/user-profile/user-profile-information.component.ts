import { Component, Input, OnInit, trigger, state, style, animate, transition } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-profile-information.html',
    styleUrls: ['./user-profile-information.css'],
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

export class UserProfileInformationComponent implements OnInit {

    @Input() user: User = new User;
    constructor(private userService: UserService) {
        let storageUser = JSON.parse(localStorage.getItem('currentUser'));
        this.user.username = storageUser.username;
    }

    ngOnInit() {
        this.getUserInformation();
    }

    getUserInformation() {
        this.userService.getByUsername(this.user.username)
            .subscribe(loadedUser => {
                console.log('Loaded user', loadedUser[0]);
                this.user.firstName = loadedUser[0].firstName;
                this.user.lastName = loadedUser[0].lastName;
                this.user.registeredAt = loadedUser[0].registeredAt;
            });
    }
}
