import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { SettingsClientsRoutingModule } from './settings-clients-routing.module';


@NgModule({
    declarations: [ListClientsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SettingsClientsRoutingModule,
        NgMultiSelectDropDownModule.forRoot()
    ]
})
export class SettingsClientsModule { }
