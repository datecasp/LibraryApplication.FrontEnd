import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../_models/Book';
import { BookAvailabilityDto } from '../../_models/BookAvailabilityDto';
import { BookUserDto } from '../../_models/BookUserDto';
import { User } from '../../_models/User';
import { BookService } from '../../_services/book.service';
import { BookUserService } from '../../_services/bookUser.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-returns-book',
  templateUrl: './user-returns-book.component.html',
  styleUrls: ['./user-returns-book.component.css']
})
export class UserReturnsBookComponent {
  public formData: BookUserDto = new BookUserDto();
  users: User[] = [];
  booksAvailables: Book[] = [];
  public bookAvailability: BookAvailabilityDto[] = [];
  userId: number = 0;
  bookId: number = 0;

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
      this.getValues();
    });
  }

  private async getValues() {
    (await this.bookService.getBooks()).subscribe(async books => {
      let k: number = 0;
      for (let i = 0; i < books.length; i++) {
        this.bookAvailability[i] = new BookAvailabilityDto(books[i], true);
        (await this.bookUserService.searchBooksOfUser(this.userId).subscribe(books => {
          for (let book of books)
          {
            if (this.bookAvailability[i].bookId == book.id)
            this.booksAvailables[k] = new Book();
            this.booksAvailables[k].id = this.bookAvailability[i].bookId;
            this.booksAvailables[k].title = this.bookAvailability[i].title;
            this.booksAvailables[k].author = this.bookAvailability[i].author;
            k++;
          }    
        }));
      }
    });
  }

  public updateValues()
  {
    this.booksAvailables = [];
    this.getValues();
  }

  public onSubmit(form: NgForm) {

    this.removeRecord(form);

  }

  public async removeRecord(form: NgForm) {
    this.formData.bookId = this.bookId;
    this.formData.userId = this.userId;

    (await this.bookUserService.userReturnsBook(this.formData)).subscribe(() => {
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
      actualUser: false
    };
  }
}
