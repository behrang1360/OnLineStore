import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'], 
})
export class ShoppingListComponent implements OnInit {
  Ingredients :Ingredient[];
  constructor(private shopingListService:ShoppingListService) { }

  ngOnInit() {
    this.Ingredients = this.shopingListService.getIngerdient();
    this.shopingListService.IngerideintChanged.subscribe(
      (ingerident: Ingredient[]) => { 
        this.Ingredients = ingerident;
      }
    );
  }

}
