import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
	mission = {}
  constructor(
  	private _missionService: MissionService,
  	private _router: Router

  	) { }

  ngOnInit(	) {
  }

  createMission(){
  	this._missionService.createMission(this.mission).subscribe((mission)=> {
      this._router.navigate([`mission-upload/${mission['mission']._id}`]);
    });
  }
}
