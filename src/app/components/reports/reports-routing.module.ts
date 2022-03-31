import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowReportsComponent } from './show-reports/show-reports.component';

const routes: Routes = [
  {path:'show',component:ShowReportsComponent, data: { title: ' قائمة التقارير' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
