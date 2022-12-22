import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
      this.router.navigate(['/books']);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  public updateRecord(form: NgForm) {
   this.bookService.updateBook(form.form.value.id, form.form.value).subscribe(() => {
      this.toastr.success('Updated successful');
      this.resetForm(form);
      this.router.navigate(['/books']);
    }, () => {
      this.toastr.error('An error occurred on update the record.');
    });
  }

  public cancel() {
    this.router.navigate(['/books']);
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
