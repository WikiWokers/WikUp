import { Injectable } from '@angular/core';

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
        console.log('email: ', email, 'password: ', password) ;

        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://www.mediawiki.org/w/api.php?action=query&meta=tokens&type=login&format=json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "75372f6a-1204-43de-b9c3-b1a9a548e098");
        xhr.send(data);

        /*fetch('https://www.mediawiki.org/w/api.php?action=query&meta=tokens&type=login&format=json')
            .then(function(response) {
                return response.json();
            }).catch((err)=>{console.log(err)})
            .then(function(myJson) {
                console.log(myJson);
            });*/

    }



}
