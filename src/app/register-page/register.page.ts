import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { NetworkService } from '../network.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public username: string;
  public password: string;
  public email: string;
  public country: string;
  public countries: any[];
  public passwordType: string;
  public passwordIcon: string;
  public tAndM: boolean;

  constructor(
    private countryService: CountryService,
    private networkService: NetworkService,
    private commonService: CommonService,
    private router: Router,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {
    this.countries = this.countryService.data;
    this.passwordType = 'password';
    this.passwordIcon = 'eye-off';
  }

  public submit(): void {
    if (this.check()) {
      this.register();
    }
  }

  goToTermsAndConditions() {
    const browser = this.iab.create(
      'https://kanavan.net/Terms-And-Conditions.html'
    );
  }

  public hideShowPassword(): void {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  public back() {
    this.router.navigate(['/login']);
  }

  private check(): boolean {
    if (!this.username || this.username.length === 0) {
      this.commonService.presentToast('Please enter the username');
      return false;
    }
    if (!this.password || this.password.length === 0) {
      this.commonService.presentToast('Please enter the password');
      return false;
    }
    if (!this.email || this.email.length === 0) {
      this.commonService.presentToast('Please enter the email');
      return false;
    }
    if (!this.country || this.country.length === 0) {
      this.commonService.presentToast('Please enter the country');
      return false;
    }
    if (!this.tAndM) {
      this.commonService.presentToast(
        'Please agree to the Terms and Conditions'
      );
      return false;
    }
    return true;
  }

  private register(): void {
    this.networkService.send(
      'POST',
      CommonService.USERS_API,
      false,
      {
        username: this.username,
        password: this.password,
        email: this.email,
        country: this.country,
      },
      (res) => {
        this.commonService.presentToast('Registration success');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.commonService.presentToast(err.error.message);
      }
    );
  }
}
