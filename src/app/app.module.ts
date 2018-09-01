import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Pro} from "@ionic/pro";
import {UserProvider} from '../providers/user/user';
import {RegisterPage} from "../pages/register/register";

import {Geolocation} from '@ionic-native/geolocation';
import {MapPage} from "../pages/map/map";
import {LoginPage} from "../pages/login/login";


Pro.init('b1c54fce', {
    appVersion: '0.0.1'
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    ionicErrorHandler: IonicErrorHandler;

    constructor(injector: Injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        } catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }

    handleError(err: any): void {
        Pro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    }
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        RegisterPage,
        MapPage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        RegisterPage,
        MapPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        IonicErrorHandler,
        [{provide: ErrorHandler, useClass: MyErrorHandler}],
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserProvider,
        Geolocation
    ]
})
export class AppModule {
}
