import {Component} from '@angular/core';
import {Camera} from "@ionic-native/camera";

@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html'
})
export class CameraPage {
    constructor(private camera: Camera) {

        const options= {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(base64Image);
        }, (err) => {
            console.error('Camera', err);
        });
    }
}
