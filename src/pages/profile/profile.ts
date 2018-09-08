import {Component} from '@angular/core';
import {UserProvider} from "../../providers/user/user";
import {User} from "../../model/User";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    private user: User = {
        email: '',
        registrationDay: new Date(),
        name: ''
    };

    constructor(private userProvider: UserProvider) {
        userProvider
            .info()
            .then(info => {
                this.user = {
                    email: info['email'],
                    registrationDay: new Date(info['registrationdate']),
                    name: info['name']
                };
            })
            .catch(error => {
                console.error('User info error: ', error);
            });
    }
}
