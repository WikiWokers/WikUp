import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {InputValidatorProvider} from "../../providers/input-validator/input-validator";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    registerForm: FormGroup;
    username: string;
    password: string;
    retype: string;
    email: string;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastCtrl: ToastController,
                private userProvider: UserProvider,
                private inputValidator: InputValidatorProvider) {
        this.addInputValidators();
    }

    private addInputValidators() {
        this.registerForm = this.formBuilder.group({
            username: this.inputValidator.username,
            email: this.inputValidator.email,
            password: this.inputValidator.password,
            retype: this.inputValidator.password
        });
    }

    register() {
        this.userProvider.register(this.username, this.email, this.password, this.retype)
            .then((response) => {
                if (response == 'PASS') {
                    // register success
                }
            })
            .catch((error) => {
                // some error happens
            });
    }
}
