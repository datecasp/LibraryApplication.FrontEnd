import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../_models/Book';
import { BookAvailabilityDto } from '../../_models/BookAvailabilityDto';
import { BookUserDto } from '../../_models/BookUserDto';
import { User } from '../../_models/User';
import { BookService } from '../../_services/book.service';
import { BookUserService } from '../../_services/bookUser.service';

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
  @Input() bookId: number = -22;

  constructor(private router: Router,
    private bookService: BookService,
    private bookUserService: BookUserService,
    private toastr: ToastrService) { }

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

}
