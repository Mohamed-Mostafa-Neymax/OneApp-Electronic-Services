import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditCityComponent } from '../edit-city/edit-city.component';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.scss']
})
export class ListCityComponent implements OnInit {
 
  cityForm:FormGroup ;
  country_id:number ;
  cities:[];
  check = false ;
  
  countries_Settings = {};
  countries:[];

  // categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];

  constructor(private dialog:MatDialog, private globalService: GlobalService , private spinner:NgxSpinnerService) { }


  ngOnInit(): void {

    this.globalService.allCountries().subscribe( countries=> {
      this.countries = countries['data'];
    }) 
     
      this.cityForm =new FormGroup({
        'allCountries' : new FormControl(null , Validators.required),
        
      })

      this.countries_Settings = {
        singleSelection: true,
        idField: 'id',
        textField: 'name_ar',
        // selectAllText: 'اختيار الكل ',
        unSelectAllText: 'الغاء الاختيار',
        itemsShowLimit: 10,
        allowSearchFilter: false,
        closeDropDownOnSelection: true
      };
  }
  
  // DROPDOWN CODE 1
  onSelect_Filter(item: any) {
    console.log('selectedFilter', item);
    // categories_List
    this.country_id = item.id;
    this.globalService.getCityByCountryId(item.id).subscribe( categoriesRes => {
      console.log('categoriesRes', categoriesRes);
      this.cities = categoriesRes['data'];
    });
  }


  onCountryChange(id){
    this.country_id = id;
    this.globalService.getCityByCountryId(this.country_id).subscribe(cities=>{
      this.cities = cities['data'];
      this.check = true;
    });
  }

  onEditCountry(city) {
    let dialogRef = this.dialog.open(EditCityComponent, {
      data:city,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res => {
   
      this.onCountryChange(this.country_id);
    })
  }
  onDeleteCountry(id) {
    this.spinner.show();
    this.globalService.deleteCity(id).subscribe(res =>{
     this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف المدينة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.onCountryChange(this.country_id);
     
    });
    
  }
}

  