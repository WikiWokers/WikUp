import {Injectable} from '@angular/core';
import {Validators} from "@angular/forms";

@Injectable()
export class InputValidatorProvider {

    constructor() {
    }

    get username() {
        return ['', Validators.compose([
            Validators.required,
        ])];
    }

    get password() {
        return ['', Validators.compose([
            Validators.required,
            Validators.minLength(4)
        ])]
    }

    get email() {
        return ['', Validators.compose([
            Validators.required,
        ])];
    }
}
