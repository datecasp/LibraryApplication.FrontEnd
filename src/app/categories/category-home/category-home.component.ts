import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../_models/Book';
import { Category } from '../../_models/Category';
import { User } from '../../_models/User';
import { BookService } from '../../_services/book.service';
import { BookUserService } from '../../_services/bookUser.service';
import { CategoryService } from '../../_services/category.service';
import { ConfirmationDialogService } from '../../_services/confirmation-dialog.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.css']
})
export class CategoryHomeComponent implements OnInit {

  categories: Category[] = [];
  userAvailability: boolean = true;
  books: Book[] = [];

  constructor(private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private bookUserService: BookUserService,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getValues();

  }

  private async getValues() {
    (await this.categoryService.getCategories()).subscribe(async categories => {
      this.categories = categories;
    });
  }

  public addCategory() {
    this.router.navigate(['/category']);
  }

  public editCategory(userId: number) {
    this.router.navigate(['/category/' + userId]);
  }

  public deleteCategory(categoryId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this category?')
      .then(() =>
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          this.toastr.success('The category has been deleted');
          this.getValues();
        },
          error => {
            this.toastr.error('Failed to delete the category.');
          }))
      .catch(() => '');
  }
}
