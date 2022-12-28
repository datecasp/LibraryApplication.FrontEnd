import { Component } from '@angular/core';
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
  selector: 'app-books-of-user',
  templateUrl: './books-of-user.component.html',
  styleUrls: ['./books-of-user.component.css']
})
export class BooksOfUserComponent {
  public formData: User = new User(0, "un nombre", false);
  public users: User[] = [];
  public books: Book[] = [];

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
      //this.userService.getUserById(id).subscribe(user => {
      //  this.formData = user;
      this.updateValues(Number(id));
      //});
    }
    else
    {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
      });
    }
  }

  public updateValues(userId: number)
  {
    this.userService.getUserById(userId).subscribe(user => {
      this.formData = user;
    this.bookUserService.searchBooksOfUser(userId).subscribe(books => {
      this.books = books;
    });
    });
  }

  public onSubmit(form: NgForm) {
    form.value.bookId = Number(form.value.bookId);
    if (form.value.id === 0) {
    } else {
    }
  }

  goBack(): void {
    this.location.back();
  }

  public cancel() {
    this.goBack();
  }

  private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.formData = {
      id: 0,
      userName: '',
      isActive: false
    };
  }
}
