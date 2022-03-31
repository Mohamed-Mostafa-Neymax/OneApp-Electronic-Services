import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import { AddCountryComponent } from './add-country/add-country.component';
import { ListCountryComponent } from './list-country/list-country.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { countryRoutingModule } from './country-routing.module';
import { EditCountryComponent } from './edit-country/edit-country.component';
import {ReactiveFormsModule } from '@angular/forms' ;
@NgModule({
  declarations: [ListCountryComponent, AddCountryComponent, EditCountryComponent],
  imports: [
    CommonModule,
    countryRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class CountryModule { }
