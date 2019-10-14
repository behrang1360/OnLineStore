import { NgLocaleLocalization } from "@angular/common";
import { debug } from 'util';

export class User {
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private tokenExpiredate: Date
  ) {
     
  }

  get Token() {
    debugger;
    if (!this.tokenExpiredate || new Date() > this.tokenExpiredate) {
      return null;
    }
    return this._token;
  }
}
