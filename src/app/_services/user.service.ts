import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseUrl + 'api/';

  constructor(private http: HttpClient) { }

  public addUser(user: User) {
    return this.http.post(this.baseUrl + 'users', user);
  }

  public updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  public deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'users/' + id);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  public search(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users/search/${name}`);
  }
}
