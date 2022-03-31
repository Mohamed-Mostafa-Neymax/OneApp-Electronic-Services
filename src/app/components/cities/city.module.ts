import { AddCityComponent } from './add-city/add-city.component';
import { ListCityComponent } from './list-city/list-city.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { EditCityComponent } from './edit-city/edit-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [ListCityComponent, AddCityComponent, EditCityComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class CityModule { }
