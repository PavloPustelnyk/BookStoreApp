import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { first } from 'rxjs/operators';
import { UserDetailed } from '../../_models/_detailed/user-detailed';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  loading = true;
  user: UserDetailed;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    this.userService
      .getUserInfo()
      .subscribe((data: UserDetailed) => {
        this.loading = false;
        this.user = data;
      },
      error => {
        this.loading = false;
        console.log(error.message);
      });
  }
}
