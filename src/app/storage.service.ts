import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private accessToken: string;

  constructor(private nativeStorage: NativeStorage) {}

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public saveAccessToken(accessToken: string) {
    this.nativeStorage.setItem('accessToken', accessToken).then(
      () => {},
      (err) => {}
    );
    // localStorage.setItem('accessToken', accessToken);
  }

  public loadAccessToken(successCallback, errorCallback) {
    this.nativeStorage
      .getItem('accessToken')
      .then(successCallback, errorCallback);
    // callback(localStorage.getItem('accessToken'));
  }
}
