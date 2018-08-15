import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplyService } from '../reply.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-mission',
  templateUrl: './show-mission.component.html',
  styleUrls: ['./show-mission.component.css']
})
export class ShowMissionComponent implements OnInit {
  mission = {}
  reply = {}
  constructor(
  	private _missionService: MissionService,
    private _replyService: ReplyService,
    private _router: Router,
  	private _route: ActivatedRoute,
	) { }

  ngOnInit(){
  	this.getMission()
  }

  getMission(){
  	this._missionService.getMission(this._route.params['value'].id).subscribe(
  	data=> {
      this.mission = data['mission']
    }
  	)
  }

  createReply(id){
    this._replyService.createReply(id, this.reply).subscribe((data)=>{
      console.log(data['data']._id)
      this._router.navigate([`/mission/${data['data']._id}`])
      this.getMission()
    })
  }

}
