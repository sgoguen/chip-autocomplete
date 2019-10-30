import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Catalog } from './catalog';
import { ProductDescriptionModel } from './product-description-model';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'chips-autocomplete-example.html',
  styleUrls: ['chips-autocomplete-example.css']
})
export class ChipsAutocompleteExample {

  public product = new ProductDescriptionModel();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  // selectedItems: string[] = [];

  public readonly catalog = new Catalog();
  public readonly filteredItems = this.catalog.keywords;

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor() {

  }

  get selectedItems() {
    return this.catalog.search.value;
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    console.log({ event: 'add', data: event });
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.catalog.addSearch(value.trim());
        // this.selectedItems.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(item: string): void {
    this.catalog.removeSearch(item);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.catalog.addSearch(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
}


