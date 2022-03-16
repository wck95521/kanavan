/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NetworkService } from './network.service';
import { StorageService } from './storage.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // private static BASE_API = 'http://192.168.1.120:4000';
  private static BASE_API = 'https://api.kanavan.net';
  public static MINING_PERIOD = 86400000;
  public static TOTAL_SUPPLY = 100000000;
  public static USERS_API = CommonService.BASE_API + '/users';
  public static MINING_API = CommonService.USERS_API + '/mining';
  public static AUTH_API = CommonService.BASE_API + '/auth';
  public static REFRESH_TOKEN_API = CommonService.AUTH_API + '/refresh';
  public static CURRENT_SUPPLY = CommonService.USERS_API + '/supply';
  private user: any;

  constructor(
    private toastController: ToastController,
    private networkService: NetworkService,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  public refreshToken(callback) {
    this.networkService.send(
      'GET',
      CommonService.REFRESH_TOKEN_API,
      true,
      null,
      (res) => {
        this.storageService.setAccessToken(res.data.accessToken);
        this.storageService.saveAccessToken(res.data.accessToken);
        callback();
      },
      (err) => {}
    );
  }

  public async presentAlert(
    header: string,
    message: string,
    confirmCallback,
    cancelCallback
  ) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: cancelCallback,
        },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: confirmCallback,
        },
      ],
    });

    await alert.present();
  }

  public getUserData() {
    return this.user;
  }

  public getUser(callback) {
    this.networkService.send(
      'GET',
      CommonService.USERS_API,
      true,
      null,
      (res) => {
        this.user = res.data;
        callback();
      },
      (err) => {}
    );
  }

  public async presentToast(mes: string) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000,
    });
    toast.present();
  }

  public getOffsetTop(e: any) {
    let offsetTop = 0;
    while (e) {
      offsetTop += e.offsetTop;
      e = e.offsetParent;
    }
    return offsetTop;
  }

  public isNumber(c: string) {
    return (
      c === '0' ||
      c === '1' ||
      c === '2' ||
      c === '3' ||
      c === '4' ||
      c === '5' ||
      c === '6' ||
      c === '7' ||
      c === '8' ||
      c === '9'
    );
  }

  public isLetter(c: string) {
    return (
      c === 'a' ||
      c === 'b' ||
      c === 'c' ||
      c === 'd' ||
      c === 'e' ||
      c === 'f' ||
      c === 'g' ||
      c === 'h' ||
      c === 'i' ||
      c === 'j' ||
      c === 'k' ||
      c === 'l' ||
      c === 'm' ||
      c === 'n' ||
      c === 'o' ||
      c === 'p' ||
      c === 'q' ||
      c === 'r' ||
      c === 's' ||
      c === 't' ||
      c === 'u' ||
      c === 'v' ||
      c === 'w' ||
      c === 'x' ||
      c === 'y' ||
      c === 'z'
    );
  }
}
