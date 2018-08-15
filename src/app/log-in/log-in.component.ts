import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { Location } from "@angular/common";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  logUser = {}
  user = {}

  constructor(
  	private _userService: UserService,
  	private _router: Router,
    private _location: Location
  	) { }

  ngOnInit() {
    console.log(this._router)
  }

  logIn(){
  	return this._userService.logIn(this.logUser).subscribe((data) => {
    this.user = data['data']
    console.log(this.user)
    this._router.navigate(['/'], {queryParams: this.user})
    }); 
  }

}
