import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookService } from './_services/book.service';
import { CategoryService } from './_services/category.service';
import { UserService } from './_services/user.service';
import { BookCategoryService } from './_services/bookCategory.service';
import { BookUserService } from './_services/bookUser.service';
import { ConfirmationDialogService } from './_services/confirmation-dialog.service';
import { NavComponent } from './nav/nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbdDatepickerPopup } from './datepicker/datepicker-popup';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './books/book/book.component';
import { BookHomeComponent } from './books/book-home/book-home.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { UserComponent } from './users/user/user.component';
import { UserHomeComponent } from './users/user-home/user-home.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddCategoryToBookComponent } from './add-category-to-book/add-category-to-book.component';
import { UserGetsBookComponent } from './book-user/user-gets-book/user-gets-book.component';
import { UserReturnsBookComponent } from './book-user/user-returns-book/user-returns-book.component';
import { CategorySelectorComponent } from './categories/category-selector/category-selector.component';
import { CategoryHomeComponent } from './categories/category-home/category-home.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryListComponent,
    BookComponent,
    BookListComponent,
    HomeComponent,
    NavComponent,
    ConfirmationDialogComponent,
    NgbdDatepickerPopup,
    UserComponent,
    UserListComponent,
    AddCategoryToBookComponent,
    BookHomeComponent,
    BookDetailComponent,
    UserGetsBookComponent,
    UserReturnsBookComponent,
    UserHomeComponent,
    UserDetailComponent,
    CategorySelectorComponent,
    CategoryHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    ToastrModule.forRoot()
  ],
  providers: [
    BookService,
    CategoryService,
    UserService,
    BookUserService,
    BookCategoryService,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
