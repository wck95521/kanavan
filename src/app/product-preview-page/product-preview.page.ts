import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.page.html',
  styleUrls: ['./product-preview.page.scss'],
})
export class ProductPreviewPage implements OnInit {
  public folder: string;
  public images: string[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.images = [
      'assets/human2.jpg',
      'assets/human2.jpg',
      'assets/human3.jpg',
    ];
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
