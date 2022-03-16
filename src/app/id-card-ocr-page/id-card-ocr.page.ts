import { Component, OnInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
} from '@awesome-cordova-plugins/camera-preview/ngx';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './id-card-ocr.page.html',
  styleUrls: ['./id-card-ocr.page.scss'],
})
export class IdCardOcrPage implements OnInit {
  public folder: string;

  constructor(
    private cameraPreview: CameraPreview,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.openCamera();
  }

  drawIDImage(base64: string, callback: any) {
    const idCardWidth = 85.6;
    const idCardHeight = 53.98;
    const left = idCardWidth - 35;
    const top = idCardHeight - 10;
    const img = new Image();
    img.src = base64;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      const wRatio = img.width / idCardWidth;
      const hRatio = img.height / idCardHeight;
      const sx = left * wRatio;
      const sy = top * hRatio;
      const sw = img.width - sx;
      const sh = img.height - sy;
      canvas.width = sw;
      canvas.height = sh;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      callback(canvas.toDataURL());
    };
  }

  public openCamera(): void {
    const options: CameraPreviewOptions = {
      camera: 'back',
      toBack: true,
      storeToFile: false,
    };
    this.cameraPreview.startCamera(options).then((data) => {});
  }

  drawImage(base64: string, callback: any) {
    const e = document.getElementById('picture2');
    const x = e.offsetLeft;
    const y = this.commonService.getOffsetTop(e);
    const w = e.offsetWidth;
    const h = e.offsetHeight;
    const img = new Image();
    img.src = base64;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      const dh = h;
      const dw = w;
      canvas.width = dw;
      canvas.height = dh;
      const wRatio = img.width / window.screen.width;
      const hRatio = img.height / window.screen.height;
      const sx = x * wRatio;
      const sy = y * hRatio;
      const sw = w * wRatio;
      const sh = h * hRatio;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
      callback(canvas.toDataURL());
    };
  }

  checkID(text: string) {
    const trim = text.trim();
    const c9 = trim[trim.length - 1];
    const c8 = trim[trim.length - 2];
    const c7 = trim[trim.length - 3];
    const c6 = trim[trim.length - 4];
    const c5 = trim[trim.length - 5];
    const c4 = trim[trim.length - 6];
    const c3 = trim[trim.length - 7];
    const c2 = trim[trim.length - 8];
    const c1 = trim[trim.length - 9];
    const c0 = trim[trim.length - 10];
    return (
      c9 === ')' &&
      this.commonService.isNumber(c8) &&
      c7 === '(' &&
      this.commonService.isNumber(c6) &&
      this.commonService.isNumber(c5) &&
      this.commonService.isNumber(c4) &&
      this.commonService.isNumber(c3) &&
      this.commonService.isNumber(c2) &&
      this.commonService.isNumber(c1) &&
      this.commonService.isLetter(c0.toLowerCase())
    );
  }

  public capture(): void {
    const options: CameraPreviewPictureOptions = {
      quality: 100,
    };
    this.cameraPreview.takePicture(options).then((base64) => {
      this.drawImage('data:image/jpeg;base64,' + base64, (url: string) => {
        this.drawIDImage(url, (url2: string) => {
          const img = new Image();
          img.src = url2;
          // document.getElementById('Img2').setAttribute('src', url2);
          Tesseract.recognize(img).then(({ data: { text } }) => {
            if (text) {
              console.log('mess ' + text + ' ' + this.checkID(text));
            } else {
              console.log('mess null');
            }
          });
        });
      });
    });
  }
}
