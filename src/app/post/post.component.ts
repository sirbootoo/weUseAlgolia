import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  shareForm: FormGroup;
  loading:boolean = false;

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
    let url = this.shareForm.controls['url'].value;
    if(!url.startsWith('http://') || !url.startsWith('https://')){
      url = 'http://'+url;
    }
    let data: any = {};
    this.postService.getUrlInfo(url).subscribe((res:any) => {
      var imgData = res.screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
      let imageData:any = 'data:image/jpeg;base64,' + imgData;
      this.postService.imageUpload(imageData).subscribe((imgRes:any) => {
        data.imageUrl = imgRes.secure_url;
        data.email = this.shareForm.controls['email'].value;
        data.description = this.shareForm.controls['description'].value
        this.postService.post(data).then(payload => {
          data.id = payload.id;
          this.postService.indexData(data).then(indexPayload => {
            console.log(indexPayload);
            this.loading = false;
          });
        });
      })
    })
  }


  



}
