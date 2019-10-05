import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shoppingList.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('txtName', { static: false }) ElementRefName: ElementRef;
  @ViewChild('txtNumber', { static: false }) ElementRefNumnber: ElementRef;
  constructor(private shoppingListService:ShoppingListService) { }
  newIngredient: Ingredient;
  
  ngOnInit() {

  }

  onAddItem() { 
    this.newIngredient = new Ingredient(this.ElementRefName.nativeElement.value,
      this.ElementRefNumnber.nativeElement.value);
       
    this.shoppingListService.addIngerdient(this.newIngredient);  }
}
