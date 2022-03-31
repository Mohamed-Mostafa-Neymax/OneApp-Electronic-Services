import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  ordersArr = [];
  orderType: string;
  searchForm: FormGroup;

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.onFilterOrders(0, 'new');
    this.searchForm = new FormGroup({
      'order_id': new FormControl(null, Validators.required)
    });
  }

  onFilterOrders(status_id: number, status_name: string) {
    this.orderType = status_name;
    this.spinner.show();
    this.globalService.listOrders(status_id).subscribe( ordersRes => {
      console.log('ordersRes', ordersRes);
      this.spinner.hide();
      this.ordersArr = ordersRes['data'].slice().sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      console.log('Sorted ordersArr', this.ordersArr);
    });
  }

  onShowDetails(orderDetails) {
    let dialogRef = this.dialog.open( OrderDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }

  onSelectOrderByID() {
    let orderDetails = this.ordersArr.find( singleOrder => {
      singleOrder['id'] == this.searchForm.value.order_id;
      this.searchForm.reset();
    });
    console.log(orderDetails);
    let dialogRef = this.dialog.open( OrderDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }
}
