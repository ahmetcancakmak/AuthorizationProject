import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  currentUser!: User;
  userFromApi!: User;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService)
  {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }

}
