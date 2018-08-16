import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor( private _http:HttpClient) { }

  createMission(mission){

  	return this._http.post("/createMission", mission)

  }

  getMissions(){
  	return this._http.get("/getMissions")
  }

  getMission(id){
  	return this._http.get(`/getMission/${id}`)
  }

  missionImage(id, image){
    console.log(image)
    return this._http.post(`/api/upload`, image)
  }

  donate(donation){
    return this._http.post('/donate',donation)
  }
}
