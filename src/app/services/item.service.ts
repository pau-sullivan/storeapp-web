import { Injectable } from '@angular/core';
import { Item } from '../item';
// import { ITEMS } from '../mock-items';
import {Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ItemService {
  // private itemsUrl = 'api/items';  //
  private URL = 'items';
//  private itemsUrl = `${environment.baseUrl}/${URL}`;
private itemsUrl = `${environment.baseUrl}/${this.URL}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient, private messageService: MessageService) { }

  getItems(): Observable<Item[]> {
//      this.log('ItemService: fetched items');
     // return of(ITEMS);
     // console.log(environment.baseUrl);
     return this.http.get<Item[]>(this.itemsUrl)
     .pipe(
      tap(items => this.log('fetched items')),
      catchError(this.handleError('', []))
     );
  }

  getItem(id: string): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
    .pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  addItem (item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      // tap((itemres: Item) => this.log(`added item w/ desc=${itemres.description}`)),
      tap(_ => this.log(`added item=${item.description}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  updateItem (item: Item): Observable<any> {
    const url = `${this.itemsUrl}/${item._id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
    tap(_ => this.log(`updated item=${item._id}`)),
    catchError(this.handleError<any>('updateItem'))
  );
}

  deleteItem(id: string): Observable<Item[]> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete<Item[]>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted item=${id}`)),
      catchError(this.handleError<any>('deleteItem'))
    )
    ;
}

/* GET items whose name contains search term */
searchItems(term: string): Observable<Item[]> {
  if (!term.trim()) {
    // if not search term, return empty item array.
    return of([]);
  }
  return this.http.get<Item[]>(`${this.itemsUrl}/?description=${term}`).pipe(
    tap(_ => this.log(`found items matching "${term}"`)),
    catchError(this.handleError<Item[]>('searchItems', []))
  );
}



  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
