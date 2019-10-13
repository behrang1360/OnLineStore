import { Component, OnInit, ViewChild } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { OK, getStatusText } from 'http-status-codes'
import { Post } from './post.model';
import { PostService } from './post.serveice';

@Component({
  selector: "app-exercise",
  templateUrl: "./exercise.component.html",
  styleUrls: ["./exercise.component.css"]
})
export class ExerciseComponent implements OnInit {
  @ViewChild("f", { static: false }) frm: NgForm;
  PostList:Post[] =[]

  constructor(private http:HttpClient,private postService:PostService) {}

  ngOnInit() {
    this.onFetchData()
  }
  
  onCreatePost(postData: Post) {
    this.postService.createPost(postData);
    this.onFetchData();
  }

  ondeleteData() { 
    this.postService.deletePost().subscribe(() => {
      this.PostList = [];     
    });    
    this.onFetchData();
  }
  onFetchData() { 
    this.postService.fetchPost().subscribe(
      (postData) => {
          console.log(postData);
          this.PostList = postData;
      }, error => {                  
        
        console.log(getStatusText(error.status));
      }         
      );;
  }
}
