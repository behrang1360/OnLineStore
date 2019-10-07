import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({providedIn:'root'})
export class RecipeService {

  onRecipeChange = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "A super-tasty Schnitzel - just awesome!",
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Recipe(
      "Big Fat Burger",
      "What else you need to say?",
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  updateRecipe(index:number,newRecipe:Recipe):void { 
    this.recipes[index] = newRecipe;
    this.onRecipeChange.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) { 
    this.recipes.push(newRecipe);
    this.onRecipeChange.next(this.recipes.slice());
  }

  deleteRecipe(index: number) { 
    this.recipes.splice(index, 1);
    this.onRecipeChange.next(this.recipes.slice());
  }

  deleteIngerdient(id: number, recipe: Recipe) {
    recipe.ingredients.splice(id, 1);
    this.onRecipeChange.next(this.recipes.slice());
   }
}
