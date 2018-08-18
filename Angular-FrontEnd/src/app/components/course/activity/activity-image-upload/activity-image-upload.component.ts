import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-image-upload',
  templateUrl: './activity-image-upload.component.html',
  styleUrls: ['./activity-image-upload.component.scss'],
  inputs:['activity']
})
export class ActivityImageUploadComponent implements OnInit {

  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
   
}
  constructor() { }

  ngOnInit() {
  }

}
