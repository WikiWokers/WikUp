import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {CameraPage} from '../camera/camera';
import {MapPage} from "../map/map";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = CameraPage;
    tab2Root = AboutPage;
    tab3Root = ContactPage;
    tab4Root = MapPage;

    constructor() {

    }
}
