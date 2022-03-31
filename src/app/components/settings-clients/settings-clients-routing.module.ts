import { ListClientsComponent } from './list-clients/list-clients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path:'list-clients', component: ListClientsComponent, data: { title: 'أظهار العملاء' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsClientsRoutingModule { }
