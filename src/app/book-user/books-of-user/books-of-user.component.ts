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
  selector: 'app-books-of-user',
  templateUrl: './books-of-user.component.html',
  styleUrls: ['./books-of-user.component.css']
})
export class BooksOfUserComponent {
  public formData: User = new User(0, "un nombre", false);
  public users: User[] = [];
  public books: Book[] = [];
  public oldBooks: Book[] = [];
  @Input() userIdDetail: number = 0;

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
    else if (this.userIdDetail != 0)
    {
      this.updateValues(Number(this.userIdDetail));
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
      this.bookUserService.searchActualBooksOfUser(userId).subscribe(books => {
        this.books = books;
        this.bookUserService.searchOldBooksOfUser(userId).subscribe(books => {
          this.oldBooks = books;

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
      userName: '',
      isActive: false
    };
  }
}
