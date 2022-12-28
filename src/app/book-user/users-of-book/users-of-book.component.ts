import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../_models/User';
import { BookService } from '../../_services/book.service';
import { UserService } from '../../_services/user.service';
import { Book } from '../../_models/Book';
import { BookUserService } from '../../_services/bookUser.service';


@Component({
  selector: 'app-users-of-book',
  templateUrl: './users-of-book.component.html',
  styleUrls: ['./users-of-book.component.css']
})
export class UsersOfBookComponent {

  public formData: Book = new Book();
  public users: User[] = [];
  public books: Book[] = [];
  public oldUsers: User[] = [];
  @Input() bookIdDetail: number = 0;

  constructor(public bookService: BookService,
    private userService: UserService,
    private bookUserService: BookUserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    if (id != null) {
      this.updateValues(Number(id));
    }
    else if (this.bookIdDetail != 0) {
      this.updateValues(Number(this.bookIdDetail));
    }
    else {
      this.bookService.getBooks().subscribe(books => {
        this.books = books;
      });
    }
  }

  public updateValues(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(book => {
      this.formData = book;
      this.bookUserService.searchActualUsersOfBook(bookId).subscribe(users => {
        this.users = users;
        this.bookUserService.searchOldUsersOfBook(bookId).subscribe(users => {
          this.oldUsers = users;
        });
      });
    });
  }

  public goBack(): void {
    this.location.back();
  }

  private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.formData = {
      id: 0,
      title: '',
      author: ''
    };
  }
}

