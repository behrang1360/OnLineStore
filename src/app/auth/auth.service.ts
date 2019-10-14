import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, debounce, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { debug } from "util";
import { User } from "./user.Model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  IsRegistered?: boolean;
}
@Injectable({ providedIn: "root" })
export class authService {
  constructor(private http: HttpClient) {}
  user = new Subject<User>();
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5C_jrE3E0n4mdImmT_BU0rS_mhMPpPo0",

        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handelError),
        tap(resData => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            +resData.expiresIn,
            resData.idToken
          );
        })
      );
  }

  signup(email: string, password: string, returnSecureToken: boolean) {
    return this.http
      .post<AuthResponseData>(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5C_jrE3E0n4mdImmT_BU0rS_mhMPpPo0",

        {
          email: email,
          password: password,
          returnSecureToken: returnSecureToken
        }
      )
      .pipe(
        catchError(this.handelError),
        tap(resData => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            +resData.expiresIn,
            resData.idToken
          );
        })
      );
  }

  private handelAuthentication(
    email: string,
    localId: string,
    expiresIn: number,
    idToken: string
  ) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expireDate);
    this.user.next(user);
  }

  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = " UnKnown error";
    if (!errorRes.error || !errorRes.error.error.message)
      return throwError(errorMessage);

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "this email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email not Found";
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
