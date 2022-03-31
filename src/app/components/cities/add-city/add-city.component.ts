import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})

export class AddCityComponent implements OnInit {
  cityForm:FormGroup ;
  country_id:number ;
  // cities:[];
  
  countries_Settings_filter = {};
  countries_list:[];

  cities_Settings_filter = {};
  cities_list:[];
  // categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];
  
  constructor(private globalService: GlobalService , private spinner:NgxSpinnerService) { }


  ngOnInit(): void {

    this.globalService.allCountries().subscribe( countries=>{
      this.countries_list=countries['data'];
    }) 
    this.countries_Settings_filter = {
      singleSelection: true,
      idField: 'id',
      textField: 'name_ar',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
    this.cities_Settings_filter = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_ar',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
      this.cityForm =new FormGroup({
        'country_id' : new FormControl(null , Validators.required),
        // 'allCities':new FormControl(null , Validators.required) ,
        'name_ar':new FormControl(null , Validators.required) ,
        'name_en' :new FormControl(null , Validators.required) 
      });
  }


  // DROPDOWN CODE 1
  onSelect_Counrty(item: any) {
    console.log('selectedFilter', item);
    // categories_List
    this.globalService.getCityByCountryId(item.id).subscribe( categoriesRes => {
      console.log('categoriesRes', categoriesRes);
      this.cities_list = categoriesRes['data'];
    });
  }
  // DROPDOWN CODE 2
  onSelect_City(item: any) {
    console.log(item);
    // this.globalService.listSubCategories(item.id).subscribe( subCategoriesRes => {
    //   console.log('subCategoriesRes', subCategoriesRes);
    //   this.sub_Categories_List = subCategoriesRes['data'];
    // });
  }
  onSelect_All_Cities(items: any) {
    console.log(items);
  }

  onSubmit(){
    let updated_cit_obj = {
      name_ar: this.cityForm.value.name_ar,
      name_en: this.cityForm.value.name_en,
      country_id: this.cityForm.value.country_id[0].id
    }
    this.spinner.show();
    this.globalService.addCity(updated_cit_obj).subscribe( res => {
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم إضافة المدينة بنجاح',
          'success'
      );
      this.cityForm.reset();
    });
  }
}
