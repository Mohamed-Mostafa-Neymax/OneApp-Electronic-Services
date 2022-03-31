import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {

  serviceForm:FormGroup ;
  category_id: number;
  sub_category_id:number;
  type = 1 ;
  
  categories_Settings = {};
  categories_List = [];

  subcategories_Settings={};
  subcategories_List=[];

  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.serviceForm=new FormGroup({
      'category_id' : new FormControl(null , Validators.required) ,
      'subcategory_id' : new FormControl(null , Validators.required) ,
      'name_ar' : new FormControl(null , Validators.required) ,
      'name_en' : new FormControl(null , Validators.required) ,
     });
    
    this.categories_Settings = {
      singleSelection: true,
      idField: 'id' ,
      textField: 'name_ar',
      enableCheckAll: true,
      unSelectAllText: 'الغاء الاختيار',
        selectAllText: 'اختيار الكل ',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true,
      defaultOpen: false,
    };

    this.subcategories_Settings = {
      singleSelection: true,
      idField: 'id' ,
      textField: 'name_ar',
      enableCheckAll: true,
      unSelectAllText: 'الغاء الاختيار',
        selectAllText: 'اختيار الكل ',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true,
      defaultOpen: false,
    };

    this.globalService.allUserCategory(this.type).subscribe( categoriesRes => {
      this.categories_List = categoriesRes['data'];
    });
    
  }

  onSelect_Category(item: any) {
    this.category_id = item.id;
    this.globalService.allUserSubCategory(item.id).subscribe( subCategoriesRes => {
      console.log('subCategoriesRes', subCategoriesRes);
      this.subcategories_List = subCategoriesRes['data'];
    });
  }
  
  onSelect_Sub_Category(item: any){ 
    this.sub_category_id = item.id;
  }

  files: File[] = [];
  imagesObj = {}

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
      console.log('Image Uploaded', imgStringRes);
      this.imagesObj['image'] = imgStringRes['files'][0];
    });
  }
   
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(){
    let updatedSubObj = {
      name_ar: this.serviceForm.value.name_ar,
      name_en: this.serviceForm.value.name_en,
      category_id: this.category_id,
      sub_category_id:this.sub_category_id 
    }
    console.log('updatedSubObj', {...updatedSubObj ,  ...this.imagesObj});
    
    this.spinner.show();
    this.globalService.addService({... updatedSubObj ,  ...this.imagesObj}).subscribe( addServiceRes => {
      console.log('addServiceRes', addServiceRes);
      this.spinner.hide()
      Swal.fire(
          'نجاح',
          'تم إضافة الخدمة بنجاح',
          'success'
      );
      this.serviceForm.reset();
    });
  }

  //  onSelect_All_Categories(items: any) {
  //   console.log(items);
  // }

 
  // onSelect_All_Sub_Categories(item: any){
  //   this.sub_category_id = item.id;
  // }
}
