import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.Model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
   
    //@Output() recipeSelected = new EventEmitter<void>();
    @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
    
   }

  ngOnInit() {
  }

  onSelected() {   
   // this.recipeSelected.emit();
    this.recipeService.recipeOnSelect.emit(this.recipe);
  }
}
