import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  editMode=false;
  editedIndex:number;
  subscription:Subscription;
  editedItem:Ingredient
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.startedEdit
    .subscribe(
      (index:number)=>{
        this.editedIndex=index;
       this.editMode=true;
       this.editedItem=this.slService.getediteIngredients(this.editedIndex);
       this.slForm.setValue({
         name:this.editedItem.name,
         amount:this.editedItem.amount
       })
      }
    );
  }

  onAddItem(f) {
    const formValue=f.value;
    const newIngredient = new Ingredient(formValue.name,formValue.amount);
    if(this.editMode)
    {
      this.slService.UpdateIngredent(this.editedIndex,newIngredient)
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
