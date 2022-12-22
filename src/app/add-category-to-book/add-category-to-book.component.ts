import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../_models/Category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../_services/category.service';
import { BookCategoryService } from '../_services/bookCategory.service';
import { Book } from '../_models/Book';
import { BookCategoryDto } from '../_models/BookCategoryDto';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-add-category-to-book',
  templateUrl: './add-category-to-book.component.html',
  styleUrls: ['./add-category-to-book.component.css']
})
export class AddCategoryToBookComponent implements OnInit {
  categories: Category[] = [{ id: 1, categoryName: "una" }, { id: 2, categoryName: "dos" }];
  bookIdList: number[] = [];
  public categoryId: number = -11;
  public categoriesOfBook: Category[] = [{ id: 1, categoryName: "una" }, { id: 2, categoryName: "dos" }];
  bookCategoryDto: BookCategoryDto = { bookId: 0, categoryId: 0 };
  public listCategories: string = "";
  public searchValueChanged: Subject<number> = new Subject<number>();

  @Input() book: Book = {id: -99, title: "qqqqqqqqq", author: "hijo"};



  constructor(private router: Router,
    private categoryService: CategoryService,
    private bookCategoryService: BookCategoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, err => {
      this.toastr.error('An error occurred on get the records.');
    });

    this.UpdateCategoriesList();
  }

  private async UpdateCategoriesList() {
    this.listCategories = "";
    (await this.bookCategoryService.searchCategoriesOfBook(this.book.id)).subscribe(categories => {
        this.categoriesOfBook = categories;
        this.UpdateCategoriesList();
    });
    for (let cat of this.categoriesOfBook) {
      this.listCategories = this.listCategories.concat(cat.categoryName + "   ");
        }
  }

  

  public async SendBookCategoryToInsert(category: Category) {
    this.bookCategoryDto.bookId = this.book.id,
    this.bookCategoryDto.categoryId = category.id;

    (await this.bookCategoryService.addBookCategory(this.bookCategoryDto)).subscribe(() => {
      this.toastr.success('Registration successful');
      this.UpdateCategoriesList();
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
      this.UpdateCategoriesList();
    });
  }

  private search() {
    if (this.book.id !== -1) {
      this.bookCategoryService.searchCategoriesOfBook(this.book.id).subscribe(book => {
        this.categories = book;
      }, error => {
        this.categories = [];
      });
    } else {
      this.categoryService.getCategories().subscribe(cats => this.categories = cats);
    }
    this.UpdateCategoriesList();

  }
}
