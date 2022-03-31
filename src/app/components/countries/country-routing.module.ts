import { ListCountryComponent } from './list-country/list-country.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCountryComponent } from './add-country/add-country.component';

const routes: Routes = [
  {path:'list',component:ListCountryComponent, data: { title: 'قائمة الدول' }},
  {path:'add',component: AddCountryComponent, data: { title: 'أضافة دولة' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class countryRoutingModule { }
