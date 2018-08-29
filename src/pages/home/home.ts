import {Component} from '@angular/core';
import {NavController, ToastController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {RegisterPage} from "../register/register";

@Component({
    selector: 'login',
    templateUrl: 'home.html'
})
export class HomePage {
    password: string;
    username: string;
    loginForm: FormGroup;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastCtrl: ToastController,
                private userProvider: UserProvider) {
        this.addInputValidators();

    }

    private addInputValidators() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.compose([
                Validators.required,
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])]
        });
    }

    login() {
        this.userProvider.login(this.username, this.password)
            .then(() => {
                this.username = this.password = '';
            })
            .catch((error) => this.showWarning(error));
    }

    private showWarning(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 5000,
            position: 'top'
        });
        toast.present();
    }

    openSigninPage() {
        this.navCtrl.push(RegisterPage);
    }
}