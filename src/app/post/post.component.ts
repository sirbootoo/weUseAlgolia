import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
// import 'rxjs/add/operator/map';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  shareForm: FormGroup;
  loading:boolean = false;
  cloudinaryOptions = environment.cloudinary;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.cloudinaryOptions)
  );

  constructor(private postService: PostService) {
    this.shareForm = new FormGroup({
      email: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    
  }

  share(){
    this.loading = true;
    console.log(this.shareForm.controls['url'].value);
    const url = this.shareForm.controls['url'].value
    var data = {
      url: url
    }
    this.postService.getUrlInfo(url).subscribe((res:any) => {
      var imgData = res.screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
      console.log(imgData)
      let imageData:any = 'data:image/jpeg;base64,' + imgData;
      this.postService.imageUpload(imageData).subscribe(imgRes => {
        console.log(imgRes);
      })
    })
  }



}
