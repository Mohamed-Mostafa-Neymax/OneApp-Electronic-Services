import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  type:number ;
  categoryForm: FormGroup;

  // categories_Settings_filter = {};
  // categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];

  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required),
      // 'image' :new FormControl(null, Validators.required) ,
      // 'type':new FormControl(null,Validators.required),
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
  }

  // DROPDOWN CODE 1
  // onSelect_Filter(item: any) {
  //   console.log('selectedFilter', item);
  //   this.type = item['programaticValue'];
  // }

  // onTypeChange(val) {
  //   this.type= val ; 
  // }


  files: File[] = [];
  imagesObj = {}

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
      this.imagesObj['image'] = imgStringRes['files'][0];
      console.log(this.imagesObj);
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit(){
    console.log({...this.categoryForm.value, type: this.type, ...this.imagesObj}) ;
    this.spinner.show();
    this.globalService.addAdminCategory({...this.categoryForm.value, type: 1, ...this.imagesObj}).subscribe( res => {
      console.log( res)
      this.spinner.hide()
      Swal.fire(
          'نجاح',
          'تم إضافة الفئة بنجاح',
          'success'
      );
      this.files.splice(0);
      this.categoryForm.reset();
    });
  }
}
