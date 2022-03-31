import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ServicesRoutingModule } from './services-routing.module';
import { ListComponent } from './list/list.component';
import { ServiceDetailsComponent } from './edit-service/service-details.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceAddComponent } from './service-add/service-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [ListComponent, ServiceDetailsComponent, ServiceAddComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    NgxDropzoneModule,
    MatDialogModule
  ]
})
export class ServicesModule { }
