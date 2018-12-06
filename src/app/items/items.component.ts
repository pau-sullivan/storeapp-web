import { Component, OnInit, ViewChild } from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../services/item.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  // item: Item = {
  //   description : 'Item 1',
  //   category : 'deporte'
  // };

  // items: Item[];
  // selectedItem: Item;
  columnsToDisplay: string[] = ['description', 'category', 'buttons'];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: ItemService) {
    this.dataSource = new MatTableDataSource<Item>();
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    // this.items = this.itemService.getItems();
    // this.itemService.getItems().subscribe(items => this.items = items);
    this.itemService.getItems().subscribe(
      items => {
        this.dataSource.data = items;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // onSelect( item: Item): void {
  //   this.selectedItem = item;
  // }

  add(description: string, category: string): void {
    description = description.trim();
    category = category.trim();
    if (!description || !category) { return; }
    this.itemService.addItem({ description, category } as Item)
      .subscribe(item => {
        // this.items.push(item);
      });
  }

  onEdit(row) {
    console.log(row);
  }

  onDelete(id: string): void {
    /* TODO: eliminar la devolucion de lista de items en la api y hacer el delete acá con
    this.heroes = this.heroes.filter(h => h !== hero); */
    this.itemService.deleteItem(id)
      .subscribe(
        // items => this.items = items as Item[]
        items => this.dataSource.data = items
      );
  }

}
