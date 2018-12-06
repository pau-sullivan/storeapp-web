import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../item';
import { ItemCategory } from '../item-category';
import { ItemService} from '../services/item.service';
import { ItemCategoryService } from '../services/item-category.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  categories: ItemCategory[];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private categoryService: ItemCategoryService,
    private location: Location) {}

  ngOnInit() {

    this.getCategories();
    this.item = new Item();

    const id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.getItem(id);
    }
  }

  getItem(id): void {
    // +this.route.snapshot.paramMap.get('id'); el + convierte a num
    this.itemService.getItem(id)
      .subscribe(item => {
        this.item = item;
      });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  save(): void {
    if (this.item._id == null ) {
      if (!this.item.description || !this.item.category) { return; }
      this.itemService.addItem(this.item)
        .subscribe(item => {
          this.goBack();
          // this.items.push(item);
        });
    } else {
    this.itemService.updateItem(this.item)
     .subscribe(() => this.goBack());
    }
  }

   goBack(): void {
    this.location.back();
  }

}
