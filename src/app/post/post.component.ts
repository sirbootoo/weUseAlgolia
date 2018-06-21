import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild('swalBox') private swalBox: SwalComponent;

  shareForm: FormGroup;
  loading:boolean = false;

  swalCus: any = {};

  constructor(private postService: PostService) {

    this.shareForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      madeBy: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    
  }

  share(){
    this.loading = true;
    let url = this.shareForm.controls['url'].value;
    console.log('Checking url for https:// and http:// ', url.startsWith('https://'), url.startsWith('http://'));
    if(url.startsWith('http://') === false){
      if(url.startsWith('https://') === false){
        url = 'http://'+url;
      }
    }
    if(url.endsWith('#/')){
      url.slice(0, -2);
    }else if(url.endsWith('#')) {
      url.slice(0, -1);
    }
    let data: any = {};
    this.postService.getUrlInfo(url).subscribe((res:any) => {
      var imgData = res.screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
      let imageData:any = 'data:image/jpeg;base64,' + imgData;
      this.postService.imageUpload(imageData).subscribe((imgRes:any) => {
        data.imageUrl = imgRes.secure_url;
        data.email = this.shareForm.controls['email'].value;
        data.madeBy = this.shareForm.controls['madeBy'].value
        this.postService.post(data).then(payload => {
          data.id = payload.id;
          data.url = url;
          data.name = this.shareForm.controls['name'].value;
          data.type = this.shareForm.controls['type'].value;
          console.log(data);
          this.postService.indexData(data).then(indexPayload => {
            console.log(indexPayload);
            this.swalCus = {
              title: 'Share successful',
              text: 'You have successfully shared the project',
              type: 'success'
            }
            this.swalBox.show();
            this.loading = false;
            this.shareForm.reset();
          });
        });
      }, err => {
        this.loading = false;
      })
    }, errs => {
      this.loading = false;
    })
  }

  goTo(url) {
    window.location.href = url;
  }
  



}
