import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditingItem = new Subject<number>();
  
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngerdientByIndex(index: number):Ingredient { 
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngerdient(index: number, item: Ingredient) {
    console.log(item);
    this.ingredients[index] = item;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  deleteIngerdient(index: number): void   {    
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
   }
}
