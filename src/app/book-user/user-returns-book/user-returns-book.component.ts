import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookUserDto } from '../../_models/BookUserDto';
import { BookUserService } from '../../_services/bookUser.service';

@Component({
  selector: 'app-user-returns-book',
  templateUrl: './user-returns-book.component.html',
  styleUrls: ['./user-returns-book.component.css']
})
export class UserReturnsBookComponent {
  public formData: BookUserDto = new BookUserDto();

  constructor(public bookUserService: BookUserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm) {

    this.removeRecord(form);
    //  this.updateRecord(form);

  }

  public async removeRecord(form: NgForm) {
    (await this.bookUserService.userReturnsBook(this.formData)).subscribe(() => {
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
      actualUser: false
    };
  }
}
