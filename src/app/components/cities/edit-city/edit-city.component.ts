import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {
  cityForm:FormGroup ;
  cities = [];
  countries = [];


  country_id:number ;
  city_id :number ;



  constructor(private dialog:MatDialog , private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
 
  ngOnInit(): void {

    console.log(this.data);

    this.cityForm = new FormGroup({ 
      'country_id' :new FormControl(this.data.country_id , Validators.required),
      // 'city_id':new FormControl(this.data.id , Validators.required),
      'name_en': new FormControl(this.data.name_en , Validators.required),
      'name_ar': new FormControl(this.data.name_ar , Validators.required)
    })
    this.globalService.allCountries().subscribe( countriesRes => {
      this.countries = countriesRes['data'];
    });
    // this.globalService.getCityByCountryId(this.data.country_id).subscribe( citiesRes => {
    //   this.cities = citiesRes['data'];
    // });
  }

  // onChangeCountry(eventData) {
  //   console.log('eventData', eventData);
  //   this.globalService.getCityByCountryId(eventData.target.value).subscribe( citiesRes => {
  //     this.cities = citiesRes['data'];
  //   });
  // }

  onSubmit(){
    console.log('Edited City', {...this.cityForm.value, city_id: this.data.id});
    
    this.spinner.show();
    this.globalService.editCity({...this.cityForm.value, city_id: this.data.id}).subscribe( editedCityRes => {
      console.log('editedCityRes', editedCityRes);
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم تعديل المدينة بنجاح',
          'success'
      )
      this.dialog.closeAll();
    });
   
  }
}
