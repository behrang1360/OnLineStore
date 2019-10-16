import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | import("rxjs").Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      map(user => {
        const isAuth = !!user;
        if (!isAuth) {
          return this.router.createUrlTree(["/auth"]);
        }
        return !!user;
      })
    );
  }
}
