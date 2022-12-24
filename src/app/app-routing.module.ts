import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookComponent } from './books/book/book.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryComponent } from './categories/category/category.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { BookHomeComponent } from './books/book-home/book-home.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { UserGetsBookComponent } from './book-user/user-gets-book/user-gets-book.component';
import { UserReturnsBookComponent } from './book-user/user-returns-book/user-returns-book.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookHomeComponent }, 
  { path: 'book', component: BookComponent },
  { path: 'bookdetail/:id', component: BookDetailComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'usergetsbook', component: UserGetsBookComponent },
  { path: 'userreturnsbook', component: UserReturnsBookComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

