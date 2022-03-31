import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { ListSubCategoriesComponent } from './list-sub-categories/list-sub-categories.component';
import { EditSubCategoryComponent } from './edit-sub-category/edit-sub-category.component';
import { DetailSubCategoryComponent } from './detail-sub-category/detail-sub-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [AddSubCategoryComponent, ListSubCategoriesComponent, EditSubCategoryComponent, DetailSubCategoryComponent],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    ReactiveFormsModule ,
    NgxDropzoneModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class SubCategoryModule { }
