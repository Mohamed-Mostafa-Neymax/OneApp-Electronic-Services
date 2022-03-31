import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  serviceForm:FormGroup ;
   
  category_id: number;
  sub_category_id:number;
  type = 1 ;
  image_edit =false ;
  categories=[];
  subcategories=[];
  // categories_Settings = {};
  //selectedCategoryItem=[];
  //selectedSubCategoryItem=[];
  //subcategories_Settings={};
  // categories_List = [];
  // subcategories_List=[];
  
 
  files: File[] = []
  imagesObj = {}
  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
   console.log(this.data);
    this.serviceForm=new FormGroup({
      'category_id' : new FormControl(this.data.category_id , Validators.required) ,
      'subcategory_id' : new FormControl(this.data.sub_category_id , Validators.required) ,
      'name_ar' : new FormControl(this.data.name_ar , Validators.required) ,
      'name_en' : new FormControl(this.data.name_en , Validators.required) ,
     });
     
    // this.selectedCategoryItem=[{id:this.data.category.id , name_ar:this.data.category.name_ar}];
    // this.selectedSubCategoryItem=[{id:this.data.subcategory.id , name_ar:this.data.subcategory.name_ar }];
    // this.categories_Settings = {
    //   singleSelection: true, 
    //   idField: 'id' ,
    //   textField: 'name_ar',
    //   enableCheckAll: true,
    //   unSelectAllText: 'الغاء الاختيار',
    //   selectAllText: 'اختيار الكل ',
    //   itemsShowLimit: 10,
    //   allowSearchFilter: false,
    //   closeDropDownOnSelection: true,
    //   defaultOpen: false,
    // };

    // this.subcategories_Settings = {
    //   singleSelection: true,
    //   idField: 'id' ,
    //   textField: 'name_ar',
    //   enableCheckAll: true,
    //   unSelectAllText: 'الغاء الاختيار',
    //   selectAllText: 'اختيار الكل ',
    //   itemsShowLimit: 10,
    //   allowSearchFilter: false,
    //   closeDropDownOnSelection: true,
    //   defaultOpen: false,
    // };
  
    this.globalService.allUserCategory(1).subscribe( categories_List => {
      this.categories = categories_List['data'];
      
    });

    this.globalService.allUserSubCategory(this.data.category_id ).subscribe( subcategories_List => {
      this.subcategories = subcategories_List['data'];
      // console.log( "this.subcategories_List" );
      // console.log( this.subcategories_List );
    });
    this.files.push(this.data.image) ;

  }
  changeCategory(val) {
    // this.category_id=val.id
     this.category_id = val ;
    console.log(this.category_id);
     this.globalService.allUserSubCategory( this.category_id).subscribe( subcategoriesRes => {
     this.subcategories = subcategoriesRes['data'];
    });
     }
   
     changeSubCategory(val){ 
     this.sub_category_id = val.target.value;
    //  this.globalService.allUserSubCategory( this.category_id).subscribe( subcategoriesRes => {
    //   this.subcategories_List = subcategoriesRes['data'];
    // });
  
    }
  
  // files: File[] = [];
 
  // imagesObj = {}
  changeImage(){
    this.image_edit=!this.image_edit ;
    this.files.pop() ;
  }

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
    this.imagesObj['image'] = imgStringRes['files'][0];
    });
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(){
  let updatedSubObj = {
    service_id : this.data.id,
    name_en: this.serviceForm.value.name_en,
    name_ar: this.serviceForm.value.name_ar,
    category_id:this.serviceForm.value.category_id ,
    // category_id:this.serviceForm.value.category_id[0].id,
    sub_category_id:this.serviceForm.value.subcategory_id ,
     ...this.imagesObj
  }

  console.log( updatedSubObj);
  this.spinner.show();
  this.globalService.editService({... updatedSubObj   }).subscribe( res => {
   
  this.spinner.hide()
  Swal.fire(
      'نجاح',
      'تم تعديل الخدمة بنجاح',
      'success'
  )
  this.dialog.closeAll();
  });
}
}
