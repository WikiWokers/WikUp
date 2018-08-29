import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";

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
                private userProvider: UserProvider) {
        this.addInputValidators();
    }

    private addInputValidators() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.compose([
                Validators.required,
            ])],
            email: ['', Validators.compose([
                Validators.required,
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])],
            retype: ['', Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])]
        });
    }

    register() {
        this.userProvider.register(this.username, this.email, this.password, this.retype);
    }
}