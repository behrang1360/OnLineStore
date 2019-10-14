import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

import { map, tap, take, exhaust, exhaustMap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { authService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageServices {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private auth: authService
  ) {}

  storeRecipie() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put("https://my-frist-app-2c395.firebaseio.com/recipes.json", recipes)
      .subscribe(resposData => {
        console.log(resposData);
      });
  }

  fetchData() { 
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://my-frist-app-2c395.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.Token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // return this.auth.user.pipe(
    //   take(1),
    //   exhaustMap(usrdata => {
    //     return this.http.get<Recipe[]>(
    //       "https://my-frist-app-2c395.firebaseio.com/recipes.json",
    //       {
    //         params: new HttpParams().set("auth", usrdata.Token)
    //       }
    //     );
    //   }),
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : []
    //       };
    //     });
    //   }),
    //   tap(resposData => {
    //     console.log(resposData);
    //     this.recipeService.setRecipes(resposData);
    //   })
    // );
    // return this.http
    //   .get<Recipe[]>("https://my-frist-app-2c395.firebaseio.com/recipes.json"
    //   ,{params:new HttpParams().set('auth',token)})
    //   .pipe(
    //     map(recipes => {
    //       return recipes.map(recipe => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : []
    //         };
    //       });
    //     }),
    //     tap(resposData => {
    //       console.log(resposData);
    //       this.recipeService.setRecipes(resposData);
    //     })
    //   );
  }
}
