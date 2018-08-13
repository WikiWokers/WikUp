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
        return new Promise(function (resolve, reject) {
            loginPromise(email, password)
                .then((response) => {
                    //TODO revisar esta cosa
                    if (response.clientlogin.status == "PASS") {
                        resolve("Logueo correcto");
                    } else {
                        reject(response.clientlogin.message);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    register(username: string, email: string, password: string, retype: string) {
        console.log('username: ', username, 'email: ', email, 'password: ', password, 'retype: ', retype);

        createAccount(username, email, password, retype)
            .then((response) => {
                //TODO revisar esta cosa
                if (response.createaccount.status == "PASS") {
                    console.log("Registro correcto");
                } else {
                    console.log("Error:"+response.createaccount.message);
                }
            })
            .catch((err) => {
                console.error('Petó algo', err);
            });

    }
}

function loginPromise(email: string, password: string) {
    return new Promise(function (resolve, rejected) {
        getToken('login').then((logintoken) => {
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

function createAccount(username: string, email: string, password: string, retype: string) {
    return new Promise(function (resolve, rejected) {
        getToken('createaccount').then((createaccounttoken) => {
            let plus = "%2B";
            let backslash = "%5C";
            let slash = "%2F";
            let colon = "%3A";
            createaccounttoken = createaccounttoken.toString().substring(0, createaccounttoken.toString().length - 2)+plus+backslash;
            let params = "username=" + username +
                "&email=" + email +
                "&password=" + password +
                "&retype=" + retype +
                "&createtoken=" + createaccounttoken +
                "&createreturnurl=https"+colon+slash+slash+"www.mediawiki.org";
            fetch('https://www.mediawiki.org/w/api.php?action=createaccount&format=json',
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
function getToken(type: string) {
    return new Promise(function (resolve, reject) {
        fetch('https://www.mediawiki.org/w/api.php?action=query&meta=tokens&type='+type+'&format=json')
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
                resolve(myJson.query.tokens[type+'token']);
            });
    });
}
