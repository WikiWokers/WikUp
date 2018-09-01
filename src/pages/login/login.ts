import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {InputValidatorProvider} from "../../providers/input-validator/input-validator";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    password: string;
    username: string;
    loginForm: FormGroup;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastCtrl: ToastController,
                private userProvider: UserProvider,
                private inputValidator: InputValidatorProvider) {
        this.addInputValidators();

    }

    private addInputValidators() {

        this.loginForm = this.formBuilder.group({
            username: this.inputValidator.username,
            password: this.inputValidator.password
        });
    }

    login() {
        this.userProvider.login(this.username, this.password)
            .then((response) => {
                if (response == "PASS") {
                    this.username = this.password = '';
                    this.navCtrl.setRoot(TabsPage);
                } else {
                    //todo hold this, the response send only the status if you want to get
                    //message have to change the resolve method
                    // console.log(response['clientlogin']['message']);
                }
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
