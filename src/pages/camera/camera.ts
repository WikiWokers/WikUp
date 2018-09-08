import {Component} from '@angular/core';
import {Camera} from "@ionic-native/camera";

@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html'
})
export class CameraPage {
    cameraData: string;
    photoTaken: boolean;
    photoSelected: boolean;

    constructor(private camera: Camera) {

        let options = {
            sourceType: camera.PictureSourceType.CAMERA,
            destinationType: camera.DestinationType.DATA_URL,
            encodingType: camera.EncodingType.JPEG,
            mediaType: camera.MediaType.PICTURE
        };
        camera.getPicture(options).then((imageData) => {
            this.cameraData = 'data:image/jpeg;base64,' + imageData;
            this.photoTaken = true;
            this.photoSelected = false;
        }, (err) => {
            console.error('Camera error', err)

        });
    }
}
