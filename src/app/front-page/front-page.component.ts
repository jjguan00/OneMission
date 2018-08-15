import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MissionService } from '../mission.service';
import { PushService } from '../push.service';
import { ReplyService } from '../reply.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  missions = []
  reply = {}
  constructor(
  	private _missionService: MissionService,
    private _pushService: PushService,
    private _replyService: ReplyService,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.getMission();
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
}
