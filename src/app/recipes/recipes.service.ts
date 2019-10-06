import { Recipe } from './recipe.Model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService { 

  recipeOnSelect = new EventEmitter<Recipe>(); 
  IngredientList: Ingredient[];

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', this.IngredientList),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',null)
      ];
 
    getRecipe() { 
        return this.recipes.slice();
  }
  
  getRecipeById(index:number) { 
    return this.recipes.slice()[index];
  }
}