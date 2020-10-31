import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit, OnDestroy {
  bsConfig: Partial<BsDatepickerConfig>;
  minMode: BsDatepickerViewMode = 'month';
  paymentForm: FormGroup;
  postPaymentSubscription: Subscription;
  paymentSts: Boolean;
  constructor(private formBuilder: FormBuilder, public commonService: CommonServiceService) {
    this.paymentSts = false;
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'MM/YYYY',
      showPreviousMonth: false
    });
    this.paymentForm = this.formBuilder.group({
      id: '1',
      fullName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiary: ['', [Validators.required, this.commonService.checkExpairy]],
      cvv: ['', [Validators.minLength(3), Validators.maxLength(3)]],
      amount: ['', Validators.required]
    })
  }
  get form() { return this.paymentForm.controls; }
  onSubmit() {
    this.postPaymentSubscription = this.commonService.postPayment(this.paymentForm.value).subscribe(data => {
      this.paymentForm.reset();
      this.paymentSts = true;

      const source = interval(3000);
      const subscribe = source.subscribe(val => this.paymentSts = false);

      // setTimeout(() => {
      //   this.paymentSts=false;
      // }, 3000);
    })
  }
  checkCharType(event, len, controlName) {
    let val = event.target.value;
    let lastchar = val.substr(val.length - 1);
    if (!(new RegExp('[0-9]').test(lastchar))) {
      val = val.substr(0, val.length - 1);
      this.paymentForm.controls[controlName].setValue(val);

    }
    if (val.length >= len) {
      event.preventDefault();
    }
  }
  ngOnDestroy() {
    this.postPaymentSubscription.unsubscribe();
  }
}
