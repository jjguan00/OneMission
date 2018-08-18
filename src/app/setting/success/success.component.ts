import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
	code = ""

  constructor(
  		private _route: ActivatedRoute,
  		private _userService: UserService
  	) {
  	if(this._route.queryParams['_value'].code == undefined){
    	console.log("You do not have a queryParams")
  	}
  	else{
    	// this.stripeConnect()
  	}
  }

  ngOnInit() {
  }

  stripeConnect(){
  	this.code = this._route.queryParams['_value'].code
  		this._userService.stripeConnect(this.code).subscribe(
  			result=>{
  				console.log(result)
  			}
  		)
  	);
  }

}
