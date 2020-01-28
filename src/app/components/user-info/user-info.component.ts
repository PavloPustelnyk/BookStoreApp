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

  public loading = true;

  public user: UserDetailed;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    this.userService.getUserInfo().pipe(first()).subscribe((data: UserDetailed) => {
      this.user = data;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
}
