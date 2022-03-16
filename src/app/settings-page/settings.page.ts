import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private commonService: CommonService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.commonService.presentAlert(
      'Logout',
      'Are you sure you want to logout?',
      () => {
        this.storageService.setAccessToken('');
        this.storageService.saveAccessToken('');
        this.router.navigate(['/login']);
      },
      () => {}
    );
  }
}
