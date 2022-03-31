import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ListComponent } from './list/list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  declarations: [ListComponent,AddCategoryComponent, CategoryDetailsComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxDropzoneModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class CategoryModule { }
