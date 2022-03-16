import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
} from '@awesome-cordova-plugins/camera-preview/ngx';

import * as faceapi from 'face-api.js';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-face-detection',
  templateUrl: './face-detection.page.html',
  styleUrls: ['./face-detection.page.scss'],
})
export class FaceDetectionPage implements OnInit {
  constructor(
    private cameraPreview: CameraPreview,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('assets/ssd_mobilenetv1'),
      faceapi.nets.faceExpressionNet.loadFromUri('assets/face_expression'),
    ]).then((data) => {});
    this.openCamera();
  }

  public openCamera(): void {
    const options: CameraPreviewOptions = {
      camera: 'front',
      toBack: true,
      storeToFile: false,
    };
    this.cameraPreview.startCamera(options).then((data) => {});
  }

  drawImage(base64: string, callback: any) {
    const e = document.getElementById('picture');
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

  public capture(): void {
    const options: CameraPreviewPictureOptions = {
      quality: 100,
    };
    this.cameraPreview.takePicture(options).then((base64) => {
      this.drawImage('data:image/jpeg;base64,' + base64, (url: string) => {
        const img = new Image();
        img.src = url;
        // document.getElementById('Img').setAttribute('src', url);
        faceapi
          .detectSingleFace(img)
          .withFaceExpressions()
          .run()
          .then((info) => {
            if (info) {
              console.log(JSON.stringify(info));
            } else {
              console.log('undefined');
            }
          });
      });
    });
  }
}
