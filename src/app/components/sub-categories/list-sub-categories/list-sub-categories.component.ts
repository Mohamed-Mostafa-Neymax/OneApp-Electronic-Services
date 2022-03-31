import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { EditSubCategoryComponent } from '../edit-sub-category/edit-sub-category.component';

@Component({
  selector: 'app-list-sub-categories',
  templateUrl: './list-sub-categories.component.html',
  styleUrls: ['./list-sub-categories.component.scss']
})
export class ListSubCategoriesComponent implements OnInit {
  categories = [] ;
  subcCategories=[];
  // check = false ;
  // filterForm:FormGroup ;
  type:number ;
  id:number;

  // categories_Settings_filter = {};
  // categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];

  categories_Settings = {};
  categories_List = [];

  constructor(private dialog:MatDialog, private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.globalService.listCategories().subscribe( categoriesRes => {
      console.log('categoriesRes', categoriesRes);
      this.categories_List = categoriesRes['data'];
    });
    if( this.id ) {
      this.globalService.allUserSubCategory(this.id).subscribe(subcategories=>{
        this.subcCategories = subcategories['data'];
      });
    }
    // this.filterForm=new FormGroup({
    //   'type' : new FormControl(null , Validators.required) ,
    //   'category' : new FormControl(null , Validators.required) ,
    // });
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
    this.categories_Settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_ar',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
  }

  // onSelect_Filter(item: any) {
  //   console.log('selectedFilter', item);
  // }


  onSelect_Category(item: any) {
    console.log(item);
    this.id = item.id;
    this.globalService.listSubCategories(item.id).subscribe( subCategoriesRes => {
      console.log('subCategoriesRes', subCategoriesRes);
      this.subcCategories = subCategoriesRes['data'];
    });
  }
  onSelect_All_Categories(items: any) {
    console.log(items);
  }



  // onTypeChange(val) {
  //   this.type=val ; 
  //   this.globalService.allUserCategory().subscribe( categories => {
  //    this.categories=categories['data'] ;
  //   })
  // }
  // onCategoryChange(category_id){
  //   this.id=category_id;
    
    
  //   this.check = true ;
  // }

  subCategoryList(){
    this.globalService.allUserSubCategory(this.id).subscribe(subcategories => {
      console.log('subcCategories', this.subcCategories);
      this.subcCategories = subcategories['data'];
    })
    // this.check = true ;
  }
  onEditCat(subCategory){
    let dialogRef = this.dialog.open( EditSubCategoryComponent, {
      data: subCategory,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>  this.subCategoryList() );
  }
  onDeleteCat(subCategory_id) {
    this.spinner.show();
    this.globalService.deleteAdminSubCategory(subCategory_id).subscribe(res =>{
     this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الفئة الفرعية بنجاح',
        'success'
      )
      this.dialog.closeAll();
     
      this.subCategoryList() ;
    });
  }

}
