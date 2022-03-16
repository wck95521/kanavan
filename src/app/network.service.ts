/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private accessToken: string;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public send(
    method: string,
    url: string,
    auth: boolean,
    data: any,
    successCallback: any,
    errorCallback: any
  ) {
    this.accessToken = this.storageService.getAccessToken();

    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accessToken,
      }),
    };

    let request = this.http.post(url, data);

    if (method === 'GET') {
      request = this.http.get(url);
    }

    if (auth) {
      request = this.http.post(url, data, httpHeaders);

      if (method === 'GET') {
        request = this.http.get(url, httpHeaders);
      }
    }

    request.subscribe(
      (res) => {
        successCallback(res);
      },
      (err) => {
        errorCallback(err);
      }
    );
  }
}
