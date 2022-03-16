/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CommonService } from '../common.service';
import { NetworkService } from '../network.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.page.html',
  styleUrls: ['./mining.page.scss'],
})
export class MiningPage implements OnInit {
  public unverifiedBalance: number;
  public transferableBalance: number;
  public currentSupply: number;
  public totalSupply: number;
  public nextDay: string;

  constructor(
    private networkService: NetworkService,
    private commonService: CommonService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.observableTimer();
    this.totalSupply = CommonService.TOTAL_SUPPLY;
  }

  ionViewWillEnter() {
    this.sharedService.notify(null);
    this.updateView();
    this.setCurrentSupply();
  }

  private setCurrentSupply() {
    this.networkService.send(
      'GET',
      CommonService.CURRENT_SUPPLY,
      false,
      null,
      (res) => {
        this.currentSupply = CommonService.TOTAL_SUPPLY - res.data.sum;
      },
      (err) => {}
    );
  }

  public mining() {
    this.networkService.send(
      'POST',
      CommonService.MINING_API,
      true,
      null,
      (res) => {
        this.setCurrentSupply();
        this.commonService.getUser(() => {
          this.updateView();
        });
      },
      (err) => {}
    );
  }

  private updateView() {
    this.unverifiedBalance = this.commonService.getUserData().unverifiedBalance;
    this.transferableBalance =
      this.commonService.getUserData().transferableBalance;
  }

  private setNextDay() {
    const date = new Date();
    const miningDate = new Date(this.commonService.getUserData().miningDate);
    const left =
      miningDate.getTime() + CommonService.MINING_PERIOD - date.getTime();
    if (left > 0) {
      const seconds = Math.floor((left / 1000) % 60);
      const minutes = Math.floor((left / 1000 / 60) % 60);
      const hours = Math.floor((left / (1000 * 60 * 60)) % 24);
      this.nextDay =
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds);
    } else {
      this.nextDay = '00:00:00';
    }
  }

  private observableTimer() {
    const source = timer(0, 1000);
    const handler = source.subscribe((val) => {
      this.setNextDay();
    });
  }
}
