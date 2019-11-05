import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public fcmToken$: string = "";

  public setFCMToken(token: string): void {
    this.fcmToken$ = token;
  }
}
