import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor( private _http: HttpClient) { }

  createReply(id, reply){
  	return this._http.post(`/createReply/${id}`, reply)
  }
}
