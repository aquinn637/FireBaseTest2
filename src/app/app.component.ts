import { Component, OnInit, NgZone } from "@angular/core";
import { LocalNotifications } from "nativescript-local-notifications";
const firebase = require("nativescript-plugin-firebase");

import { AppService } from "./app.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

	constructor(private appService: AppService, private ngZone: NgZone) {}

	public ngOnInit(): void {

		this.appService.setFCMToken('hello world');

		firebase
			.init({

				showNotifications: true,
				showNotificationsWhenInForeground: true,

				onPushTokenReceivedCallback: (token) => {
					console.log('[Firebase] onPushTokenReceivedCallback:', { token });
					this.ngZone.run(() => this.appService.setFCMToken(token));
				},

				onMessageReceivedCallback: (message) => {
					console.log('[Firebase] onMessageReceivedCallback:', { message });

					LocalNotifications.schedule([{
						title: message.title,
						body: message.body
			  		}]);

				}

			})
			.then(
				() => { console.log("firebase.init done"); },
				error => { console.log(`firebase.init error: ${error}`); }
			);

	}

}
