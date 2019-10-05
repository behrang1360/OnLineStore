import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService{

    IngerideintChanged = new EventEmitter<Ingredient[]>();
    private Ingredients: Ingredient[] = [new Ingredient('Appel', 5), new Ingredient('Orange', 15)];
    
    getIngerdient() { 
        return this.Ingredients.slice();
    }

    addIngerdient(item: Ingredient) { 
        this.Ingredients.push(item);
        this.IngerideintChanged.emit(this.Ingredients.slice());
    }
}