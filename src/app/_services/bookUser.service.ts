import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookCategoryDto } from '../_models/BookCategoryDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Category } from '../_models/Category';
import { User } from '../_models/User';
import { BookUserDto } from '../_models/BookUserDto';

@Injectable({
  providedIn: 'root'
})
export class BookUserService {
  private baseUrl: string = environment.baseUrl + 'api/';

  constructor(private http: HttpClient) { }
  //IMPLEMENTAR LOGICA userGetsBook(bookId, userID)
  public async userGetsBook(bookUserDto: BookUserDto) {
    return await this.http.post(this.baseUrl + 'usergetsbook', bookUserDto);
  }

    //IMPLEMENTAR LOGICA UserReturnsBook(bookId, userID)
  public userReturnsBook(id: number) {
    return this.http.delete(this.baseUrl + 'books/' + id);
  }

  public searchBooksOfUser(userId: number): Observable<BookCategoryDto[]> {
    return this.http.get<BookCategoryDto[]>(this.baseUrl + 'books/booksuser/userId/' + userId);
  }

  public searchUsersOfBook(bookId: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'books/usersofbook/bookId/'+bookId);
  }

  public searchAvailabilityOfBook(bookId: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'books/availabilityofbook/bookId/' + bookId);
  }
}
