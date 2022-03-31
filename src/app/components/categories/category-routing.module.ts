import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {path:'list',component:ListComponent, data: { title: 'قائمة الأقسام الرئيسية' }},
  {path:'add',component:AddCategoryComponent, data: { title: 'أضافة قسم رئيسي' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
