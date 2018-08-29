import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {AboutPage} from "../pages/about/about";
import {HomePage} from "../pages/home/home";
import {UserProvider} from "../providers/user/user";
import {ContactPage} from "../pages/contact/contact";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userProvider: UserProvider) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            userProvider.userID().then((ID) => {
                if(ID == 0) this.rootPage = HomePage;
                else this.rootPage = ContactPage
            });
        });
    }
}
