import {Injectable} from '@angular/core';

@Injectable()
export class UserProvider {

    constructor() {
        console.log('Hello UserProvider Provider');
    }

    userID(){
        const URL = 'https://www.mediawiki.org/w/api.php?action=query&meta=userinfo&format=json&uiprop=blockinfo%7Chasmsg%7Cgroups%7Cgroupmemberships%7Cimplicitgroups%7Crights%7Cchangeablegroups%7Coptions%7Ceditcount%7Cratelimits%7Cemail%7Crealname%7Cacceptlang%7Cregistrationdate%7Cunreadcount%7Ccentralids';
        return new Promise(function (resolve, reject) {
            fetch(URL).then((response) => {
                response.json().then(res => resolve(res.query.userinfo.id));
            }).catch((error) => {
                reject(error);
            });
        });
    }

    login(email: string, password: string) {
        return new Promise(function (resolve, reject) {
            loginPromise(email, password)
                .then((response) => {
                    resolve(response['clientlogin']['status']);
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
                if (response['createaccount']['status'] == "PASS") {
                    console.log("Registro correcto");
                } else {
                    console.log("Error:" + response['createaccount']['message']);
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
                    response.json().then(json => resolve(json));
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
                    response.json().then(json => resolve(json));

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
