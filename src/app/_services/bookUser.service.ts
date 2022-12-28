import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookCategoryDto } from '../_models/BookCategoryDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Category } from '../_models/Category';
import { User } from '../_models/User';
import { BookUserDto } from '../_models/BookUserDto';
import { Book } from '../_models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookUserService {
  private baseUrl: string = environment.baseUrl + 'api/';

  constructor(private http: HttpClient) { }

  public async userGetsBook(bookUserDto: BookUserDto) {
    return await this.http.post(this.baseUrl + 'usergetsbook', bookUserDto);
  }

  public async userReturnsBook(bookUserDto: BookUserDto) {
    return await this.http.put(this.baseUrl + 'userreturnsbook', bookUserDto);
  }

  public searchActualBooksOfUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'booksofuser/userId/' + userId);
  }

  public searchOldBooksOfUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'booksofuser/userId/' + userId + "?actualBooks=false");
  }

  public searchUsersOfBook(bookId: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'usersofbook/bookId/'+bookId);
  }

  public searchAvailabilityOfBook(bookId: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'availabilityofbook/bookId/' + bookId);
  }
}
