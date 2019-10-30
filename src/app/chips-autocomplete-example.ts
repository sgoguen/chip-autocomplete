import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, BehaviorSubject } from "rxjs";
import { map, startWith, flatMap } from "rxjs/operators";
import faker from "faker";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "chips-autocomplete-example",
  templateUrl: "chips-autocomplete-example.html",
  styleUrls: ["chips-autocomplete-example.css"]
})
export class ChipsAutocompleteExample {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  selectedItems: string[] = ["Lemon"];

  catalog = generateCatalog();

  @ViewChild("fruitInput", { static: false }) fruitInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredItems = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.getKeywords().slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || "").trim()) {
        this.selectedItems.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
  }

  getKeywords() {
    const keywords = new Set<string>();
    
    for(var item of this.catalog) {
      keywords.add(`${item.product.toLowerCase()}`);
      keywords.add(`${item.color.toLowerCase()}`);
      keywords.add(`${item.adjective.toLowerCase()}`);
    }

    return Array.from(keywords.keys()).sort();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.getKeywords().filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}


class Catalog {
  private readonly products = generateCatalog();
  public readonly search = new BehaviorSubject<string[]>([]);
  public readonly foundProducts = this.search.pipe(
    flatMap(terms => [terms])
  );

  addSearch(searchTerm: string) {
    const newSearch = this.search.value.map(i => i).concat(searchTerm);
    this.search.next(newSearch);
  }
}

function generateCatalog() {
  faker.seed(123);
  let catalog = [];
  for (let id = 1; id <= 20; id++) {
    const product = faker.commerce.product();
    const color = faker.commerce.color();
    const adjective = faker.commerce.productAdjective();
    catalog.push({ id, product, color, adjective });
  }
  return catalog;
}
