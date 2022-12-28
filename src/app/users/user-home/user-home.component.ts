import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Book } from '../../_models/Book';
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
  books: Book[] = [];

  constructor(private router: Router,
    private bookService: BookService,
    private userService: UserService,
    private bookUserService: BookUserService,
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

  /**
   *
   * Check if user has books before inactivate
   * If user has books, can´t inactivate
   * Actually doesn´t work as expected
   * TODO 
   * 
   * @param userId
   * @param user
   */
  public checkBooksOfUser(userId: number, user: User)
  {
    let canInactivate: boolean = true;

    this.books = [];
    this.bookUserService.searchActualBooksOfUser(userId).subscribe(books => {
      this.books = books;
      if (this.books.length != 0) canInactivate = false;
      this.userActivationToggle(user, canInactivate);
    }, err => this.userActivationToggle(user, canInactivate));
  }

  public async userActivationToggle(user: User, canInactivate: boolean) {
    if (canInactivate)
    {
        this.confirmationDialogService.confirm('Atention', 'Do you really want to change availability to this user?')
          .then(async () =>
            await this.userService.toggleUserAvailability(user.id, user).subscribe(() => {
              this.toastr.success('The user has been updated');
              this.getValues();
            },
              err => {
                this.toastr.error('Saved but worng message IDKW.');
                this.getValues();
              }))
          .catch(() => '');
      }
      else
      {
       this.toastr.error('User with books can´t get inactive.');
      }
  }

  public detailsUser(userId: number) {
    this.router.navigate(['/userdetail/' + userId]);
  }

  public editUser(userId: number) {
    this.router.navigate(['/user/' + userId]);
  }

  public usersOfBook() {
    this.router.navigate(['/usersofbook']);
  }

  public booksOfUser() {
    this.router.navigate(['/booksofuser']);
  }

  public booksOfUserId(userId: number) {
    this.router.navigate(['/booksofuser/' + userId]);
  }

  public userGetsBook() {
    this.router.navigate(['/usergetsbook']);
  }

  public userReturnsBook() {
    this.router.navigate(['/userreturnsbook']);
  }
}
