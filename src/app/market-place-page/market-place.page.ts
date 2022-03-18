import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../category.service';
import { CommonService } from '../common.service';
import { NetworkService } from '../network.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss'],
})
export class MarketPlacePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public categories: string[];
  public viewData = [];

  constructor(
    private networkService: NetworkService,
    private commonService: CommonService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories = this.categoryService.data;
    this.categories.splice(0, 0, 'All');
    // this.setViewData(this.createData());
    this.loadData(false, null);
  }

  ionViewWillEnter() {
    this.selectCategory(0);
  }

  public selectCategory(idx) {
    for (let i = 0; i < this.categories.length; i++) {
      document
        .getElementById('cate-' + i)
        .classList.remove('scroll-menu-item-color');
    }
    document
      .getElementById('cate-' + idx)
      .classList.add('scroll-menu-item-color');
  }

  public loadData(isFirstLoad, event) {
    setTimeout(() => {
      console.log('Done');
      this.setViewData(this.createData());
      if (isFirstLoad) {
        event.target.complete();
      }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.viewData.length > 50) {
        console.log(this.viewData);
        event.target.disabled = true;
      }
    }, 500);
  }

  public loadData2(event) {
    this.loadData(true, event);
  }

  private createData() {
    return [
      {
        image1: 'assets/human3.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 1,
      },
      {
        image1: 'assets/human2.png',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 2,
      },
      {
        image1: 'assets/human3.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 3,
      },
      {
        image1: 'assets/human.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 4,
      },
      {
        image1: 'assets/human.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 5,
      },
      {
        image1: 'assets/human2.png',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 6,
      },
      {
        image1: 'assets/human3.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 7,
      },
      {
        image1: 'assets/human.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 8,
      },
      {
        image1: 'assets/human.jpg',
        productName: 'aaaaaaaaaabbbbbbbbbb',
        price: 9,
      },
    ];
  }

  private setViewData(data) {
    const res = [];
    const num1 = Math.round(data.length / 2);
    const num2 = data.length - num1;
    for (let i = 0; i < num1; i++) {
      res[i] = { left: data[i], right: null };
    }
    for (let i = 0; i < num2; i++) {
      res[i].right = data[num1 + i];
    }
    this.viewData.push(...res);
  }
}
