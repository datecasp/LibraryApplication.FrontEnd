import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../_models/Book';
import { Category } from '../../_models/Category';
import { BookService } from '../../_services/book.service';
import { BookCategoryService } from '../../_services/bookCategory.service';

export interface IBookDetail {
  bookId: number;
  title: string;
  author: string;
  categories: Category[];

}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  categories: Category[] = [{ id: 0, categoryName: "" }]
  bookDetails: IBookDetail = { bookId: 0, title: "", author: "", categories: this.categories };

  public book: Book = new Book();
  public categoriesString: string = "";

  constructor(private bookService: BookService,
    private bookCategoryService: BookCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    this.categoriesString = "";
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    if (id != null) {
      await this.bookService.getBookById(id).subscribe(book => {
        this.book = book;

        this.bookDetails.bookId = book.id;
        this.bookDetails.title = book.title;
        this.bookDetails.author = book.author;

        this.bookCategoryService.searchCategoriesOfBook(book.id).subscribe(categories => {
          this.categories = categories;
          this.bookDetails.categories = categories;
          for (let cat of categories) {
            this.categoriesString = this.categoriesString.concat(cat.categoryName + "   ");
          }
        });
      });
    }

  }

  public back() {
    this.router.navigate(['/books']);
  }
}
