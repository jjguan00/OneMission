import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {};
  verification = {};
  verifyRequests = {};
  customer = {};

  constructor(
  	private _userService:UserService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) { }

  ngOnInit() {
  	this.getUser();
    this.getVerifyRequests();
  }

  getUser(){
  	return this._userService.getUser( this._route.params['value'].id).subscribe(
  		data =>{
  			this.user = data['user']
  		}
  	);
  }

  forVerify(){
    return this._userService.forVerify(this.verification).subscribe(
      ()=>{
        this._router.navigate(['/'])
      }
    )
  }

  getVerifyRequests(){
    return this._userService.getVerifyRequests().subscribe(
      (data)=>{
        console.log(data)
        this.verifyRequests = data['requests']
      }
    )
  }

  approveRequest(requestee){
    return this._userService.approveVerify(requestee).subscribe()
  }
}
