import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getUrlInfo(url){
    return this.http.get('https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url=' + url + '&screenshot=true');
  }

  imageUpload(base64) {
    var url = 'https://api.cloudinary.com/v1_1/dfcq5fnhg/auto/upload'
    return this.http.post(url, {
      file: base64,
      upload_preset: 'epafwhgt'
    });
  }

}
