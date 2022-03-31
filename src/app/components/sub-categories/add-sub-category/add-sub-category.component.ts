import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  subCategoryForm:FormGroup;
  category_id: number;
  // categories=[]; 
  // categories_Settings_filter = {};
  // categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];

  categories_Settings = {};
  categories_List = [];

  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.subCategoryForm=new FormGroup({
      // 'type':new FormControl(null , Validators.required) ,
      'category_id' : new FormControl(null , Validators.required) ,
      'name_ar':new FormControl(null , Validators.required) ,
      'name_en':new FormControl(null , Validators.required) ,
    });
    // this.categories_Settings_filter = {
    //   singleSelection: true,
    //   idField: 'programaticValue',
    //   textField: 'showedValue',
    //   // selectAllText: 'اختيار الكل ',
    //   unSelectAllText: 'الغاء الاختيار',
    //   itemsShowLimit: 10,
    //   allowSearchFilter: false,
    //   closeDropDownOnSelection: true
    // };
    this.globalService.listCategories().subscribe( categoriesRes => {
      console.log('categoriesRes', categoriesRes);
      this.categories_List = categoriesRes['data'];
    });
    this.categories_Settings = {
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

  files: File[] = [];
  imagesObj = {}
  // onTypeChange(val) {
  //   this.type=val ;
  //   this.globalService.allUserCategory(this.type).subscribe(categories=>{
  //     this.categories=categories['data'] ;
  //   })
  // }

  // onSelect_Filter(item: any) {
  //   console.log('selectedFilter', item);
  // }
  // DROPDOWN CODE 2
  onSelect_Category(item: any) {
    console.log(item);
    this.category_id = item.id;
  }
  onSelect_All_Categories(items: any) {
    console.log(items);
  }


 
  // onCategoryChange(cat_id){
  //   this.category_id=cat_id ;
  // }
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
  onSubmit() {
   
    let updatedSubObj = {
      name_ar: this.subCategoryForm.value.name_ar,
      name_en: this.subCategoryForm.value.name_en,
      category_id: this.category_id
    }
    console.log({...updatedSubObj ,  ...this.imagesObj});
    this.spinner.show();
    this.globalService.addAdminSubCategory({...updatedSubObj ,  ...this.imagesObj}).subscribe( res => {
      console.log("res");
      console.log( res);
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم إضافة الفئة الفرعية بنجاح',
        'success'
      );
      this.files.splice(0);
      this.subCategoryForm.reset();
    });
    
  }
}
