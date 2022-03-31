import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss'],
  
})
export class EditCountryComponent implements OnInit {
  countryForm:FormGroup ;
 
  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
  
  ngOnInit(): void {
   this.countryForm=new FormGroup({
     'name_ar': new FormControl(this.data.name_ar , Validators.required) ,
     'name_en':new FormControl(this.data.name_en , Validators.required) ,
   })
  }

  onSubmit(){
    this.spinner.show();
    this.globalService.editCountry({...this.countryForm.value, country_id: this.data.id}).subscribe( res=> {
      
    this.spinner.hide();
    Swal.fire(
        'نجاح',
        'تم تعديل الدولة بنجاح',
        'success'
    )
    this.dialog.closeAll();
    
    });
   
  }
   
}
 