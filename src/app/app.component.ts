import { Component, OnInit } from "@angular/core";

const firebase = require("nativescript-plugin-firebase");

import { AppService } from "./app.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  constructor(private appService: AppService) {

  }

    ngOnInit() {
      firebase.init({

        showNotifications: true,
        showNotificationsWhenInForeground: true,

        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
        
        onPushTokenReceivedCallback: (token) => {

          console.log('[Firebase] onPushTokenReceivedCallback:', { token });

          //TODO: set the token here
          this.appService.setFCMToken(token); // = token;

        },
  
        onMessageReceivedCallback: (message) => {
          console.log('[Firebase] onMessageReceivedCallback:', { message });
        }

      }).then(
        () => { console.log("firebase.init done"); },
        error => {
          console.log(`firebase.init error: ${error}`);
        }
      );
    }

}
