import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './books/book/book.component';
import { BookHomeComponent } from './books/book-home/book-home.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryHomeComponent } from './categories/category-home/category-home.component';
import { UserComponent } from './users/user/user.component';
import { UserHomeComponent } from './users/user-home/user-home.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserGetsBookComponent } from './book-user/user-gets-book/user-gets-book.component';
import { UserReturnsBookComponent } from './book-user/user-returns-book/user-returns-book.component';
import { BooksOfUserComponent } from './book-user/books-of-user/books-of-user.component';
import { UsersOfBookComponent } from './book-user/users-of-book/users-of-book.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookHomeComponent }, 
  { path: 'book', component: BookComponent },
  { path: 'bookdetail/:id', component: BookDetailComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'booksofuser', component: BooksOfUserComponent },
  { path: 'booksofuser/:id', component: BooksOfUserComponent },
  { path: 'usergetsbook', component: UserGetsBookComponent },
  { path: 'userreturnsbook', component: UserReturnsBookComponent },
  { path: 'categories', component: CategoryHomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'users', component: UserHomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'userdetail/:id', component: UserDetailComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'usersofbook', component: UsersOfBookComponent },
  { path: 'usersofbook/:id', component: UsersOfBookComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

