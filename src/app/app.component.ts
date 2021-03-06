/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string;
  public appPages: any[];
  public email: string;
  public username: string;

  constructor(
    private router: Router,
    private menu: MenuController,
    private commonService: CommonService,
    private storageService: StorageService,
    private sharedService: SharedService,
    private platform: Platform
  ) {
    this.appPages = [
      { title: 'Main', url: 'mining', icon: 'home' },
      // { title: 'Main', url: 'main', icon: 'home' },
      // { title: 'KYC', url: 'kyc', icon: 'person' },
      { title: 'Settings', url: 'settings', icon: 'settings' },
      // { title: 'Add new product', url: 'add-product', icon: 'shirt' },
      { title: 'Market Place', url: 'market-place', icon: 'shirt' },
      { title: 'My Products', url: 'product-list', icon: 'create' },
    ];
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.setTitle(events.url);
      }
    });
  }

  setTitle(url: string) {
    for (const p of this.appPages) {
      if (url === '/' + p.url) {
        this.title = p.title;
        break;
      }
    }
    if (url === '/') {
      this.title = this.appPages[0].title;
    }
    if (url === '/product-preview') {
      this.title = 'Product preview';
    }
  }

  public shouldShowHeader() {
    return (
      this.router.url === '/mining' ||
      this.router.url === '/settings' ||
      this.router.url === '/market-place' ||
      this.router.url === '/product-list'
    );
  }

  public shouldShowBackButton() {
    return (
      this.router.url === '/add-product' ||
      this.router.url === '/product-preview'
    );
  }

  // public back() {}

  public goTo(page: any) {
    this.router.navigate([page.url]);
    this.menu.close();
  }

  public openMenu() {
    this.menu.open('start');
  }

  public setMenuHeader() {
    this.email = this.commonService.getUserData().email;
    this.username = this.commonService.getUserData().username;
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(
      10,
      (processNextHandler) => {}
    );
    this.sharedService.notify$.subscribe((data) => {
      this.setMenuHeader();
    });
    this.redirect();
  }

  private redirect() {
    this.storageService.loadAccessToken(
      (res) => {
        this.storageService.setAccessToken(res);
        this.commonService.refreshToken(() => {
          this.commonService.getUser(() => {
            this.router.navigate(['/mining']);
          });
        });
      },
      (err) => {
        this.router.navigate(['/market-place']);
      }
    );
  }
}
