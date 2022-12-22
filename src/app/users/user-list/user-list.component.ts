import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../_models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any;
  public searchTerm: string = "";
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router,
    private service: UserService,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getUsers();

    this.searchValueChanged.pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

  private getUsers() {
    this.service.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public addUser() {
    this.router.navigate(['/user']);
  }

  public editUser(userId: number) {
    this.router.navigate(['/user/' + userId]);
  }

  public deleteUser(userId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this user?')
      .then(() =>
        this.service.deleteUser(userId).subscribe(() => {
          this.toastr.success('The user has been deleted');
          this.getUsers();
        },
          error => {
            this.toastr.error('Failed to delete the user.');
          }))
      .catch(() => '');
  }

  private search() {
    if (this.searchTerm !== '') {
      this.service.search(this.searchTerm).subscribe(user => {
        this.users = user;
      }, error => {
        this.users = [];
      });
    } else {
      this.service.getUsers().subscribe(users => this.users = users);
    }
  }
}
