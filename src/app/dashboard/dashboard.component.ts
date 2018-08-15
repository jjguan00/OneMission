import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {}
  missions = []
  constructor( 
  	private _userService: UserService,
  	private _router: Router,
    private _route: ActivatedRoute
   ) { this.user = _route.queryParams['value']
  }

  ngOnInit() {
  	this.checkLogIn();
  }

  checkLogIn(){
  	this._userService.checkLogIn().subscribe(data => this.user = data['data'])
  }

  logOut(){
  	this._userService.logOut().subscribe(()=>{
      this.user = {}
      this._router.navigate(['/'])
    })
  }
}
