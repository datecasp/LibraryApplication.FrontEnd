import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Book } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public formData: Book = new Book();
  public categories: any;

  constructor(public bookService: BookService,
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
      this.bookService.getBookById(id).subscribe(book => {
        this.formData = book;
      });
    } else {
      this.resetForm();
    }

  }

  public onSubmit(form: NgForm) {
    form.value.bookId = Number(form.value.bookId);
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  public async insertRecord(form: NgForm) {
    (await this.bookService.addBook(form.form.value)).subscribe(() => {
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
   this.bookService.updateBook(form.form.value.id, form.form.value).subscribe(() => {
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

  private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.formData = {
      id: 0,
      title: '',
      author: '',
    };
  }
}
