import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor( private _http: HttpClient) { }
  
  createPush(id){
  	return this._http.get(`/createPush/${id}`)
  }
}
