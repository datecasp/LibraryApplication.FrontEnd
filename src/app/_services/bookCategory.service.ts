import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookCategoryDto } from '../_models/BookCategoryDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Category } from '../_models/Category';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  private baseUrl: string = environment.baseUrl + 'api/';

  constructor(private http: HttpClient) { }
  //IMPLEMENTAR LOGICA AddCategoryToBook(bookId, categoryID)
  public async addBookCategory(bookCategory: BookCategoryDto) {
    return await this.http.post(this.baseUrl + 'books/addcategorytobook', bookCategory);
  }

    //IMPLEMENTAR LOGICA RemoveCategoryFromBook(bookId, categoryID)
  public deleteBookCategory(id: number) {
    return this.http.delete(this.baseUrl + 'books/' + id);
  }

  public searchBooksWithCategory(categoryId: number): Observable<BookCategoryDto[]> {
    return this.http.get<BookCategoryDto[]>(`${this.baseUrl} + books/booksWithCategory/categoryId//${categoryId}`);
  }

  public searchCategoriesOfBook(bookId: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'books/categoriesofbook/bookId/'+bookId);
  }
}
