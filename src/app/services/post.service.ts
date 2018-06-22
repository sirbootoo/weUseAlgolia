import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import * as algoliasearch from 'algoliasearch';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: AngularFirestoreCollection;

  constructor(private http: HttpClient, private db: AngularFirestore) {
    this.posts = db.collection('posts');
  }


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

  post(data){
    return this.posts.add(data);
  }

  indexData(data, env){
    let client = algoliasearch(env.AppId, env.prodApiKey);
    var index = client.initIndex(env.indexName);

    return index.addObject(data);
  }

  

}
