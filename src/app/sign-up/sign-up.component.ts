import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user = {}
  constructor( 
  	private _userService:UserService,
  	private _router: Router
  	) { }

  ngOnInit() {
  }

  create(){
  	this._userService.create(this.user).subscribe( () => this._router.navigate(['/']))
  }

}
