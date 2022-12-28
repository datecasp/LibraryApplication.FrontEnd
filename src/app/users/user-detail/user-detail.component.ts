import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../_models/User';
import { BookCategoryService } from '../../_services/bookCategory.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user: User = new User(0, "", true);

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    if (id != null) {
      await this.userService.getUserById(id).subscribe(user => {
        this.user.id = user.id;
        this.user.userName = user.userName;
        this.user.isActive = user.isActive;
      });
    }

  }

  public goBack(): void {
    this.location.back();
  }
}
