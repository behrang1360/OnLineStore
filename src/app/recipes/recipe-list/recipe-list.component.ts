import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.Model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  Recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe 1",
      " Descripton goes hear",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzP1gbxofQX0zV6XdWJrxJxYV0x9UtMqBZaCpfK58mr_sa5D8"
    )
    ,new Recipe(
      "A Test Recipe 2",
      " Descripton goes hear",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzP1gbxofQX0zV6XdWJrxJxYV0x9UtMqBZaCpfK58mr_sa5D8"
    )
  ];

  constructor() {}

  ngOnInit() {}

  AddNewRecipe() {
    this.Recipes.push(
    new Recipe(
      "A Test Recipe" + Math.random(),
      " Descripton goes hear",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzP1gbxofQX0zV6XdWJrxJxYV0x9UtMqBZaCpfK58mr_sa5D8n"
    ));
  }
}
