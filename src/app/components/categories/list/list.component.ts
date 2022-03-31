import { EditCategoryComponent } from './../edit-category/edit-category.component';
import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  type: number;
  check = false;
  categories = [];

  // categories_Settings_filter = {};
  // categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];

  constructor(private dialog:MatDialog, private globalService:GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.onlistCategories();
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

  // onSelect_Filter(item: any) {
  //   console.log('selectedFilter', item);
  //   this.type = item.programaticValue;
  //   this.listCategories();
  // }

  onlistCategories() {
    this.globalService.listCategories().subscribe( categories => this.categories = categories['data'] );
  }



  // onTypeChange(val) {
  //   this.type=val ; 
  //   this.globalService.allUserCategory(this.type).subscribe(categories=>{
  //     this.categories=categories['data'] ;
  //   })
  //   this.check=true ;
  // }

  // categoryList() {
  //   this.globalService.allUserCategory(this.type).subscribe( categories => {
  //     console.log(categories['data']);
  //     this.categories = categories['data'];
  //   });
  // }

  // onShowDetails(cat) {
  //   let dialogRef = this.dialog.open( CategoryDetailsComponent, {
  //     data: cat,
  //     height: '600px',
  //     width: '600px',
  //   });
  // }
  onEditCat(cat) {
    let dialogRef = this.dialog.open( EditCategoryComponent, {
      data: cat,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>  this.onlistCategories() );
  }
  onDeleteCat(cat_id) {
    this.spinner.show();
    this.globalService.deleteAdminCategory(cat_id).subscribe(res =>{
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الفئة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.onlistCategories();
    });
  }



  // categoryList(){
  //   this.spinner.show()
  //   this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
  //   this.spinner.hide()
  //   console.log('res')
  //     console.log(res)
  //     this.categories=res
  //   })
  // }
  // deleteApp(category_id){
  //   this.service.deleteCategory(category_id).subscribe(res=>{
  //     Swal.fire(
  //       'نجاح',
  //       'تم حذف الفئة بنجاح',
  //       'success'
  //       )
  //       this.categoryList()
  //   })
  // }
  // viewApp(category){
  //   let dialogRef = this.dialog.open(CategoryDetailsComponent, {
  //     data:category,
  //     height: '310px',
  //     width: '400px',
  //   });
  // }
}
