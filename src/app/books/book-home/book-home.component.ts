import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../_models/Book';
import { BookAvailabilityDto } from '../../_models/BookAvailabilityDto';
import { User } from '../../_models/User';
import { BookService } from '../../_services/book.service';
import { BookUserService } from '../../_services/bookUser.service';
import { ConfirmationDialogService } from '../../_services/confirmation-dialog.service';

@Component({
  selector: 'app-book-home',
  templateUrl: './book-home.component.html',
  styleUrls: ['./book-home.component.css']
})

export class BookHomeComponent implements OnInit {
  public books: Book[] = [{ id: -111, title: "hjhjhjhjh", author: "sddfefef" }];
  public availables: boolean[] = [true];
  public isAvailable: boolean = true;
  public users: User[] = [{ id: -11, userName: "kkkk", isActive: true }];
  public bookAvailability: BookAvailabilityDto[] = [];

  constructor(private router: Router,
    private bookService: BookService,
    private bookUserService: BookUserService,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {

    this.getValues();

  }

  private async getValues() {
    (await this.bookService.getBooks()).subscribe(async books => {

      for (let i = 0; i < books.length; i++) {
        (await this.bookUserService.searchAvailabilityOfBook(books[i].id)).subscribe(isAvailable => {
          this.bookAvailability[i] = new BookAvailabilityDto(books[i], isAvailable);
        });
      }
    });
  }

  public addBook() {
    this.router.navigate(['/book']);
  }

  public detailsBook(bookId: number) {
    this.router.navigate(['/bookdetail/' + bookId]);
  }

  public editBook(bookId: number) {
    this.router.navigate(['/book/' + bookId]);
  }

  public deleteBook(bookId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this book?')
      .then(() =>
        this.bookService.deleteBook(bookId).subscribe(() => {
          this.toastr.success('The book has been deleted');
          this.getValues();
        },
          err => {
            this.toastr.error('Failed to delete the book.');
          }))
      .catch(() => '');
  }

  public userGetsBook() {
    this.router.navigate(['/usergetsbook']);
  }

  public userReturnsBook() {
    this.router.navigate(['/userreturnsbook']);
  }

}
