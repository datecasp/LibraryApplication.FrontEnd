import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../_models/User';
import { BookService } from '../../_services/book.service';
import { BookUserService } from '../../_services/bookUser.service';
import { ConfirmationDialogService } from '../../_services/confirmation-dialog.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  users: User[] = [];
  userAvailability: boolean = true;

  constructor(private router: Router,
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getValues();

  }

  private async getValues() {
    (await this.userService.getUsers()).subscribe(async users => {
      this.users = users;
    });
  }

  public addUser() {
    this.router.navigate(['/user']);
  }

  public userActivationToggle(userId: number, user: User) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to change availability to this user?')
      .then(async () =>
        await this.userService.toggleUserAvailability(userId, user).subscribe(() => {
          this.toastr.success('The user has been updated');
          this.getValues();
        },
          err => {
            this.toastr.error('Failed to update the user.');
            this.getValues();
          }))
      .catch(() => '');
    //this.userService.toggleUserAvailability(userId, user);
    //this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate(['users'])
  }
  /*
   *  Modify url to navigate when component is done
   */
  public detailsUser(userId: number) {
    this.router.navigate(['/userdetail/' + userId]);
  }

  public editUser(userId: number) {
    this.router.navigate(['/user/' + userId]);
  }

  public deleteUser(userId: number) {
    //this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this user?')
    //  .then(() =>
    //    this.bookService.deleteBook(userId).subscribe(() => {
    //      this.toastr.success('The user has been deleted');
    //      this.getValues();
    //    },
    //      err => {
    //        this.toastr.error('Failed to delete the user.');
    //      }))
    //  .catch(() => '');
  }

}
