import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Book } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { BookUserService } from '../../_services/bookUser.service';
import { BookUserDto } from '../../_models/BookUserDto';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { BookAvailabilityDto } from '../../_models/BookAvailabilityDto';

@Component({
  selector: 'app-user-gets-book',
  templateUrl: './user-gets-book.component.html',
  styleUrls: ['./user-gets-book.component.css']
})
export class UserGetsBookComponent implements OnInit {
  public formData: BookUserDto = new BookUserDto();
  users: User[] = [];
  usersActive: User[] = [];
  booksAvailables: Book[] = [];
  public bookAvailability: BookAvailabilityDto[] = [];
  selectedUser: number = 0;
  selectedBook: number = 0;

  constructor(public bookUserService: BookUserService,
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    (this.userService.getUsers()).subscribe(async users => {
      this.users = users;
      for (let user of this.users)
      {
        if (user.isActive)
        {
          this.usersActive.push(new User(user.id, user.userName, true));
        }
      }
      this.getValues();
    });

  }

  private async getValues() {
    (await this.bookService.getBooks()).subscribe(async books => {
      let k: number = 0;
      for (let i = 0; i < books.length; i++) {
        (await this.bookUserService.searchAvailabilityOfBook(books[i].id)).subscribe(isAvailable => {
          this.bookAvailability[i] = new BookAvailabilityDto(books[i], isAvailable);
          if (this.bookAvailability[i].isAvailable)
          {
            this.booksAvailables[k] = new Book();
            this.booksAvailables[k].id = this.bookAvailability[i].bookId;
            this.booksAvailables[k].title = this.bookAvailability[i].title;
            this.booksAvailables[k].author = this.bookAvailability[i].author;
            k++;
          }
        });
      }
    });
  }

  public onSubmit(form: NgForm) {
  
      this.insertRecord(form);    
  }

  public async insertRecord(form: NgForm) {
    this.formData.bookId = this.selectedBook;
    this.formData.userId = this.selectedUser;

    (await this.bookUserService.userGetsBook(this.formData)).subscribe(() => {
      this.toastr.success('Registration successful');
      this.resetForm(form);
      this.goBack();
    }, err => {
      this.toastr.error('Saved but not right message IDKW.');
      this.goBack();
    });
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
      bookId: 0,
      userId: 0,
      actualUser: true
    };
  }
}
