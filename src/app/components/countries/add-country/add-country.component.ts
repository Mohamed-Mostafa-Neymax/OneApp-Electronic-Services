import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  countryForm: FormGroup;
  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.countryForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.spinner.show();
    this.globalService.addCountry(this.countryForm.value).subscribe( res => {
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم إضافة الدولة بنجاح',
          'success'
      );
      this.countryForm.reset();
    });
  }
}
