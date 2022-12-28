import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public async userActivationToggle(userId: number, user: User) {
    //this.books = [];
    //await this.bookUserService.searchBooksOfUser(userId).subscribe(books => {

    //  for (let book of books) this.books.push(book);
    //  if (this.books.length != 0) this.userAvailability = false;
    //  else this.userAvailability = true;
    //});

    //  if (this.userAvailability) {
        this.confirmationDialogService.confirm('Atention', 'Do you really want to change availability to this user?')
          .then(async () =>
            await this.userService.toggleUserAvailability(userId, user).subscribe(() => {
              this.toastr.success('The user has been updated');
              this.getValues();
            },
              err => {
                this.toastr.error('Saved but worng message IDKW.');
                this.getValues();
              }))
          .catch(() => '');
      //}
      //else {
      //  this.toastr.error('User with books can´t get inactive.');
      //}
  }

  private async checkBooksOfUser(userId: number) {
    this.books = [];
    (await this.bookUserService.searchActualBooksOfUser(userId)).subscribe(books => {
      for (let book of books) this.books.push(book);
    });
    if (this.books.length != 0) this.userAvailability = false;
    else this.userAvailability = true;
  }

  public detailsUser(userId: number) {
    this.router.navigate(['/userdetail/' + userId]);
  }

  public editUser(userId: number) {
    this.router.navigate(['/user/' + userId]);
  }

  public booksOfUser(userId: number) {
    this.router.navigate(['/booksofuser/' + userId]);
  }

  public userGetsBook() {
    this.router.navigate(['/usergetsbook']);
  }

  public userReturnsBook() {
    this.router.navigate(['/userreturnsbook']);
  }
}
