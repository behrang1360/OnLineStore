import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { Form, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  index: number;
  editMode: boolean =false;
  selectedIngerdient: Ingredient;
  ngOnDestroy(): void {
    this.startEditingItem.unsubscribe();
  }
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild("f", { static: false }) editForm: FormControl;
  constructor(private slService: ShoppingListService) {}
  startEditingItem: Subscription;

  ngOnInit() {
    this.startEditingItem = this.slService.startEditingItem.subscribe(value => {
      this.index = value;
      this.editMode = true;
      this.selectedIngerdient = this.slService.getIngerdientByIndex(this.index);
      this.setIngerdient(this.selectedIngerdient);
    });
  }

  setIngerdient(item: Ingredient) {
    this.editForm.setValue({
      name: item.name,
      number: item.amount
    });
  }

  clearFrom() { 
    this.editForm.reset();
    this.editMode = false;
  }
  
  deleteItem() { 
    this.slService.deleteIngerdient(this.index);
    this.clearFrom();
  }


  onAddItem(form: FormControl) {
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.number;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.updateIngerdient(this.index, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
  }
}
