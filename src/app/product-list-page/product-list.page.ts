import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  public maximumProducts = 3;
  public products = [
    {
      image1: 'assets/human3.jpg',
      productName: 'aaaaaaaaaabbbbbbbbbb',
      price: 1,
    },
    {
      image1: 'assets/human3.jpg',
      productName: 'aaaaaaaaaabbbbbbbbbb',
      price: 2,
    },
  ];
  ngOnInit() {}
}
