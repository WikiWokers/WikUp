import {Injectable} from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

    constructor() {
        console.log('Hello UserProvider Provider');
    }

    login(email: string, password: string) {
        console.log('email: ', email, 'password: ', password);

        loginPromise(email, password)
            .then((response) => {
                if (response.clientlogin.status == "PASS") {
                    console.log("Logueo correcto");
                } else {
                    console.log("Usuario o contraseña incorrectos");
                }
            })
            .catch((err) => {
                console.error('Petó algo', err);
            });

    }
}

function loginPromise(email: string, password: string) {
    return new Promise(function (resolve, rejected) {
        getLoginToken().then((logintoken) => {
            let plus = "%2B";
            let backslash = "%5C";
            let slash = "%2F";
            let colon = "%3A";
            logintoken = logintoken.toString().substring(0, logintoken.toString().length - 2)+plus+backslash;
            let params = "username=" + email +
                "&password=" + password +
                "&logintoken=" + logintoken +
                "&loginreturnurl=https"+colon+slash+slash+"www.mediawiki.org"+slash +
                "&rememberMe=1";
            fetch('https://www.mediawiki.org/w/api.php?action=clientlogin&format=json',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: params
                })
                .then((response) => {
                    resolve(response.json());
                })
                .catch((error) => {
                    rejected(error);
                })
        });
    });
}

//TODO cuando no tiene conexión, controlar el error del fetch
function getLoginToken() {
    return new Promise(function (resolve, reject) {
        fetch('https://www.mediawiki.org/w/api.php?action=query&meta=tokens&type=login&format=json')
            .then(function (response) {
                if (response.status.toString() != "200") {
                    reject("Inténtelo más tarde");
                }
                return response.json();
            })
            .catch((err) => {
                reject(err);
            })
            .then(function (myJson) {
                resolve(myJson.query.tokens.logintoken);
            });
    });
}
