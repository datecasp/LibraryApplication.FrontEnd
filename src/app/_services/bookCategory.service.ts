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

  public async addBookCategory(bookCategoryDto: BookCategoryDto) {
    return await this.http.post(this.baseUrl + 'books/addcategorytobook', bookCategoryDto);
  }

    //IMPLEMENTAR LOGICA RemoveCategoryFromBook(bookId, categoryID)
  public deleteBookCategory(bookCategoryDto: BookCategoryDto) {
    return this.http.delete(this.baseUrl + 'books/removecategoryfrombook', {body:bookCategoryDto});
  }

  public searchBooksWithCategory(categoryId: number): Observable<BookCategoryDto[]> {
    return this.http.get<BookCategoryDto[]>(`${this.baseUrl} + books/booksWithCategory/categoryId//${categoryId}`);
  }

  public searchCategoriesOfBook(bookId: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'books/categoriesofbook/bookId/'+bookId);
  }
}
