import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { authService } from "./auth.service";
import { Observable, from } from "rxjs";
import { AuthResponseData } from "./auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-auth",
  templateUrl: "./auth-component.html",
  styleUrls: ["./auth-component.css"]
})
export class authComponent implements OnInit {
  constructor(private autService: authService,private router:Router) {}
  ngOnInit() {}
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = "";

  onLogin(frm: NgForm) {
    this.error = "";
    if (!frm.value["email"]) return;
   
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if (!this.isLoginMode) {
      authObs = this.autService.login(frm.value.email, frm.value.password);
    } else {
      authObs = this.autService.signup(
        frm.value.email,
        frm.value.password,
        true
      );
    }
    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorRes => {
        this.error = errorRes;
        console.log(errorRes);
        this.isLoading = false;
      }
    );
    frm.reset();
  }
  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
}
