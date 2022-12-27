import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Category } from 'src/app/_models/Category';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public formData: Category = new Category;

  constructor(public categoryService: CategoryService,
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
      this.categoryService.getCategoryById(id).subscribe(category => {
        this.formData = category;
      }, error => {
        this.toastr.error('An error occurred on get the record.');
      });
    } else {
      this.resetForm();
    }
  }

  private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.formData = {
      id: 0,
      categoryName: ''
    };
  }

  public onSubmit(form: NgForm) {
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  public async insertRecord(form: NgForm) {
    (await this.categoryService.addCategory(form.form.value)).subscribe(() => {
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

  public updateRecord(form: NgForm) {
    this.categoryService.updateCategory(form.form.value.id, form.form.value).subscribe(() => {
      this.toastr.success('Registration successful');
      this.resetForm(form);
      this.goBack();
    }, err => {
      this.toastr.error('Saved but not right message IDKW.');
      this.goBack();
    });
  }

  public cancel() {
    this.goBack();
  }
}
