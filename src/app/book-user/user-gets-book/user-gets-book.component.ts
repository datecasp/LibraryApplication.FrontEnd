import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { BookUserService } from '../../_services/bookUser.service';
import { BookUserDto } from '../../_models/BookUserDto';

@Component({
  selector: 'app-user-gets-book',
  templateUrl: './user-gets-book.component.html',
  styleUrls: ['./user-gets-book.component.css']
})
export class UserGetsBookComponent implements OnInit {
  public formData: BookUserDto = new BookUserDto();

  constructor(public bookUserService: BookUserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm) {
  
      this.insertRecord(form);
    //  this.updateRecord(form);
    
  }

  public async insertRecord(form: NgForm) {
    (await this.bookUserService.userGetsBook(this.formData)).subscribe(() => {
      this.toastr.success('Registration successful');
      this.resetForm(form);
      this.router.navigate(['/books']);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
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
      bookId: 0,
      userId: 0,
      actualUser: true
    };
  }
}
