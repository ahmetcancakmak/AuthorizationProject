import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-listing-page',
  templateUrl: './user-listing-page.component.html',
  styleUrls: ['./user-listing-page.component.scss']
})
export class UserListingPageComponent implements OnInit {

  users: User[] = [];
  currentUser!: User;
  isHidden: boolean = true;
  userForm!: FormGroup;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getAllUsers();

    this.userForm = this.formBuilder.group({
      id: [''],
      username: [''],
      password: [''],
      role: ['']
    });
  }

  get userFormValues() { return this.userForm; }

  addUser(){
    this.userService.createUser(this.userFormValues.value).subscribe(res=>{
      alert("User Added")
    },
      err=>{
      alert("Error")
    });
  }

  deleteUser(id){
    this.userService.removeUser(id).subscribe(res=>{
        alert("User Deleted")
      },
      err=>{
        alert("Error")
      });
  }

  editUser(id){
    this.userService.editUser(id).subscribe(res=>{
        alert("User Edited")
      },
      err=>{
        alert("Error")
      });
  }

  getAllUsers(){
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }
}
