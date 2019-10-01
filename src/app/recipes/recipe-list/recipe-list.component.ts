import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.Model";
import { ProviderAst } from "@angular/compiler";
import { RecipeService } from "../recipes.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipe: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipe.getRecipe();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
