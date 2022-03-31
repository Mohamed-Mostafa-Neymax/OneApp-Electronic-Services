import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  type:number;

  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name_ar': new FormControl(this.data.name_ar, Validators.required),
      'name_en': new FormControl(this.data.name_en, Validators.required)
      // 'type' :new FormControl(this.data.type ,Validators.required)
    });
  }
  
  // onTypeChange(val) {
  //   this.type= val ; 
  // }


  files: any[] = [0];
  image_edit = false;
  imagesObj = {}

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
      console.log('imgStringRes', imgStringRes);
      this.imagesObj['image'] = imgStringRes['files'][0];
     // console.log(imagesObj);
    });
  }
  changeImage(){
    this.image_edit =! this.image_edit;
    this.files.pop();
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
    this.spinner.show();
    this.globalService.editAdminCategory({...this.categoryForm.value, type: 1, ...this.imagesObj ,category_id: this.data.id})
    .subscribe( editedCategoryRes => {
      console.log('editedCategoryRes', editedCategoryRes);
      
    this.spinner.hide();
    Swal.fire(
        'نجاح',
        'تم تعديل الفئة بنجاح',
        'success'
    )
     this.dialog.closeAll();
    });
   
  }
  }
 
