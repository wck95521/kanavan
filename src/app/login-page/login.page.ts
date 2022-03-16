import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private networkService: NetworkService,
    private storageService: StorageService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit() {}

  public register() {
    this.router.navigate(['/register']);
  }

  public auth() {
    this.networkService.send(
      'POST',
      CommonService.AUTH_API,
      false,
      {
        username: this.username,
        password: this.password,
      },
      (res) => {
        this.storageService.saveAccessToken(res.data.accessToken);
        this.storageService.setAccessToken(res.data.accessToken);
        this.commonService.getUser(() => {
          this.router.navigate(['/mining']);
        });
      },
      (err) => {
        this.commonService.presentToast(err.error.message);
      }
    );
  }
}
