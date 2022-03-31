import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SettingsOrdersParcelsRoutingModule } from './settings-orders-parcels-routing.module';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
    declarations: [ListOrdersComponent, OrderDetailsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SettingsOrdersParcelsRoutingModule,
        NgMultiSelectDropDownModule.forRoot()
    ]
})
export class SettingsOrdersParcelsModule { }
