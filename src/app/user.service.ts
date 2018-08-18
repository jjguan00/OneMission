import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http: HttpClient) { }

  create(user){
  	return this._http.post("/create", user)
  }

  logIn(user){
  	return this._http.post("/logIn", user)
  }

  logOut(){
  	console.log("you are here")
  	return this._http.get("/logOut")
  }

  checkLogIn(){
  	return this._http.get("/checkLogIn")
  }

  getUser(id){
    return this._http.get(`/getUser/${id}`)
  }

  forVerify(form){
    return this._http.post('/verifyRequest', form)
  }

  getVerifyRequests(){
    return this._http.get('/getVerifyRequests')
  }

  approveVerify(requestee){
    return this._http.get(`/approveVerify/${requestee}`)
  }

  setCustomer(customer){
    console.log(customer)
    return this._http.post('/setCustomer', customer)
  }

  saveCredit(token){
    return this._http.get(`/saveCredit/${token}`)
  }

  stripeConnect(code){
    return this._http.get(`/stripeConnect/${code}`)
  }
}
