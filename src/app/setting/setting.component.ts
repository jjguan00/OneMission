import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder, Validators , NgForm} from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  stripeTest: FormGroup;

  user = {}
  verification = {}
  cardInfo = {}

  constructor(
  	private _userService: UserService,
  	private _route: ActivatedRoute,
  	private _router: Router,
    public stripeService: StripeService,
    private fb: FormBuilder
  	) { }


  ngOnInit() {
  	this.checkLogIn()
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements()
    .subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  createToken(){
    console.log(this.card)
    console.log(this.cardInfo)
    this.stripeService.createToken(this.card, this.cardInfo).subscribe(result=>{
      this._userService.saveCredit(result['token']).subscribe(data=> data)
    })
  }

  checkLogIn(){
  	return this._userService.checkLogIn().subscribe(data=>{
  		this.user = data['data']
  	})
  }

  forVerify(){
    return this._userService.forVerify(this.verification).subscribe(
      ()=>{
        this._router.navigate(['/'])
      }
    )
  }

}
