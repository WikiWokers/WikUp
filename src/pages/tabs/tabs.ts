import {Component} from '@angular/core';

import {ProfilePage} from '../profile/profile';
import {RankingPage} from '../ranking/ranking';
import {CameraPage} from '../camera/camera';
import {MapPage} from "../map/map";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = CameraPage;
    tab2Root = ProfilePage;
    tab3Root = RankingPage;
    tab4Root = MapPage;

    constructor() {

    }
}
