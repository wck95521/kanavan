import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { CategoryService } from '../category.service';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  public folder: string;
  public images: string[];
  public hashtags: string[];
  public hashtag: string;
  public categories: string[];
  public category: string;
  public maximumHashTag: number;
  public contact: string;
  public productDescription: string;
  public productName: string;
  public price: number;

  constructor(
    private imagePicker: ImagePicker,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.images = [
      'assets/human2.jpg',
      'assets/human2.jpg',
      'assets/human3.jpg',
    ];
    this.categories = this.categoryService.data;
    this.hashtags = [];
    this.maximumHashTag = 3;
  }

  public addHashtag() {
    this.hashtags.push('#' + this.hashtag);
    this.hashtag = '';
  }

  public removeHashtag(i: number) {
    this.hashtags.splice(i, 1);
  }

  public pick() {
    const self = this;
    this.imagePicker
      .getPictures({
        width: 800,
        quality: 70,
        outputType: 1,
        maximumImagesCount: 5,
      })
      .then(
        (res) => {
          self.images = [];
          for (const base64 of res) {
            self.images.push('data:image/jpeg;base64,' + base64);
          }
        },
        (err) => {}
      );
  }
}
