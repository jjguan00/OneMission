import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSelectDirective } from 'ng2-file-upload';


@Component({
  selector: 'app-mission-upload',
  templateUrl: './mission-upload.component.html',
  styleUrls: ['./mission-upload.component.css']
})
export class MissionUploadComponent implements OnInit {
  mission = {}
  selectedFile: File = null;
  constructor(
  	private _missionService: MissionService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    console.log
  }

  missionImage() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    console.log(fd)
   this._missionService.missionImage(this._route.params['value'].id , fd)
    .subscribe();
  }
}
