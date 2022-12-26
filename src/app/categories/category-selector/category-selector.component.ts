import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/_models/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';
import { BookCategoryService } from 'src/app/_services/bookCategory.service';
import { Book } from 'src/app/_models/Book';
import { BookCategoryDto } from 'src/app/_models/BookCategoryDto';
import { BookService } from 'src/app/_services/book.service';
import { CategorySelectedDto } from '../../_models/CategorySelectedDto';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  public selectedCategories: CategorySelectedDto[] = [{ id: 1, categoryName: "oro", isSelected: false }];
  public categories: Category[] = [{ id: 1, categoryName: "una" }, { id: 2, categoryName: "dos" }];
  public categoriesOfBook: Category[] = [{ id: 1, categoryName: "una" }, { id: 2, categoryName: "cuatro" }];
  bookCategoryDto: BookCategoryDto = { bookId: 0, categoryId: 0 };
  isSelected: boolean = false;
  color: ThemePalette = "warn";

  @Input() book: Book = { id: -99, title: "qqqqqqqqq", author: "hijo" };



  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private bookService: BookService,
    private bookCategoryService: BookCategoryService,
    private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    (await this.bookCategoryService.searchCategoriesOfBook(Number(id))).subscribe(async selCategories => {
      this.categoriesOfBook = selCategories;
      this.getValues(true);
    }, error => {
      this.getValues(false);
    });

  }

  private async getValues(flag: boolean) {
    if (flag) {
      (await this.categoryService.getCategories()).subscribe(async categories => {
        for (let i = 0; i < categories.length; i++) {
          this.selectedCategories[i] = new CategorySelectedDto(categories[i], false);
          for (let categoryOfBook of this.categoriesOfBook) {
            if (this.selectedCategories[i].id == categoryOfBook.id) {
              this.selectedCategories[i].isSelected = true;
            }
          }
        }
      });
    }
    else
    {
      (await this.categoryService.getCategories()).subscribe(async categories => {
        for (let i = 0; i < categories.length; i++) {
          this.selectedCategories[i] = new CategorySelectedDto(categories[i], false);
        }
      });
    }
  }

  private async UpdateCategoriesList() {
    (await this.bookCategoryService.searchCategoriesOfBook(this.book.id)).subscribe(categories => {
      this.categoriesOfBook = categories;
    });
  }


  public async change(category: CategorySelectedDto) {
    this.bookCategoryDto.bookId = this.book.id;
    this.bookCategoryDto.categoryId = category.id;

    category.isSelected = !category.isSelected;

    if (category.isSelected) {
      (await this.bookCategoryService.addBookCategory(this.bookCategoryDto)).subscribe(() => {
        this.toastr.success('Registration successful');
        this.UpdateCategoriesList();
      }, () => {
        this.toastr.error('An error occurred on insert the record.');
        this.UpdateCategoriesList();
      });
    }
    else {
      (await this.bookCategoryService.deleteBookCategory(this.bookCategoryDto)).subscribe(() => {
        this.toastr.success('Registration successful');
        this.UpdateCategoriesList();
      }, () => {
        this.toastr.error('An error occurred on insert the record.');
        this.UpdateCategoriesList();
      });
    }
  }

  public async SendBookCategory(category: Category) {
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

