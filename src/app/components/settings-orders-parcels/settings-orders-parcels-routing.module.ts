import { ListOrdersComponent } from './list-orders/list-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path:'list-orders', component: ListOrdersComponent, data: { title: 'أظهار جميع الطلبات' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsOrdersParcelsRoutingModule { }
