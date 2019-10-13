import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}
  createPost(post: Post) {  

    return this.http
      .post("https://my-frist-app-2c395.firebaseio.com/pots.json", post)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  deletePost() { 
    return this.http.delete("https://my-frist-app-2c395.firebaseio.com/pots.json");  
  }

  fetchPost() {
  return  this.http.get<{[Key:string]:Post}>("https://my-frist-app-2c395.firebaseio.com/pots.json").
    pipe(
      map((responseData) => { 
        const postArray :Post[]=[];
        for (const key in responseData) { 
          if (responseData.hasOwnProperty(key))
          postArray.push({...responseData[key],id:key})       
        }
        return postArray;
      })
    )
    

  }
}
