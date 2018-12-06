import { Injectable } from '@angular/core';
import { ItemCategory } from '../item-category';
import {Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ItemCategoryService {

  // private categoriesUrl = 'api/itemCategories';  //
  private  URL = 'itemCategories';
  private categoriesUrl = `${environment.baseUrl}/${this.URL}`;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

  getCategories(): Observable<ItemCategory[]> {
    return this.http.get<ItemCategory[]>(this.categoriesUrl);
  }

  getCategory(id: string): Observable<ItemCategory> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<ItemCategory>(url);
  }

  addCategory (itemCategory: ItemCategory): Observable<ItemCategory> {
    return this.http.post<ItemCategory>(this.categoriesUrl, itemCategory, this.httpOptions);
  }

  updateCategory (itemCategory: ItemCategory): Observable<any> {
    const url = `${this.categoriesUrl}/${itemCategory._id}`;
    return this.http.put(url, itemCategory, this.httpOptions);
  }

  deleteCategory(id: string): Observable<ItemCategory[]> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete<ItemCategory[]>(url, this.httpOptions);
  }
}
