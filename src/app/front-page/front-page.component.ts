import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MissionService } from '../mission.service';
import { PushService } from '../push.service';
import { ReplyService } from '../reply.service';
import { Router, ActivatedRoute} from '@angular/router'
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  missions = []
  reply = {}
  donation = {}
  user :any

  constructor(
    private _route: ActivatedRoute,
  	private _missionService: MissionService,
    private _pushService: PushService,
    private _replyService: ReplyService,
  	private router: Router,
    private stripeService: StripeService
  	) { 
    }

  ngOnInit() {
  	this.getMission();
    this.user = this._route.queryParams['_value'];
    console.log(this.user)
  }

  getMission(){
    this._missionService.getMissions().subscribe(data => this.missions = data['missions'])
  }

  createPush(id){
    this._pushService.createPush(id).subscribe()
  }

  createReply(id){
    this._replyService.createReply(id, this.reply).subscribe()
  }

  donate(){
    this._missionService.donate(this.donation).subscribe();
  }
}
