import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipe.Model";
import { RecipeService } from "./recipes.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeServcie: RecipeService) {}

  ngOnInit() {
    this.recipeServcie.recipeOnSelect.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
