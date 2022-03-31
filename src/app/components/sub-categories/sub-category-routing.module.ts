import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { ListSubCategoriesComponent } from './list-sub-categories/list-sub-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'list', component: ListSubCategoriesComponent, data: { title: 'قائمة الأقسام الفرعية' }},
  {path:'add', component: AddSubCategoryComponent, data: { title: 'أضافة قسم فرعي' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
