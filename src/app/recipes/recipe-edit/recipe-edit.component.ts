import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { variable } from "@angular/compiler/src/output/output_ast";
import { createElementCssSelector } from "@angular/compiler";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private slRecipe: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  addNewIngerdient() {
    (<FormArray>this.recipeEditForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngerdient(index :number)
  {     
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode)
      this.slRecipe.updateRecipe(this.id, this.recipeEditForm.value);
    else this.slRecipe.addRecipe(this.recipeEditForm.value);
    this.onCancel();
  }
  private initForm() {
    let recipeModel: Recipe = new Recipe("", "", "", []);
    let recipeIngeridents = new FormArray([]);
    if (this.editMode) {
      recipeModel = this.slRecipe.getRecipe(this.id);
      if (recipeModel["ingredients"]) {
        for (let item of recipeModel.ingredients)
          recipeIngeridents.push(
            new FormGroup({
              name: new FormControl(item.name, Validators.required),
              amount: new FormControl(item.amount, [
                Validators.required,
                Validators.pattern(/^(0|[1-9][0-9]*)$/)
              ])
            })
          );
      }
    }    

    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeModel.name, Validators.required),
      description: new FormControl(
        recipeModel.description,
        Validators.required
      ),
      imagePath: new FormControl(recipeModel.imagePath, Validators.required),
      ingredients: recipeIngeridents
    });
  }
}
