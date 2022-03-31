import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { ServiceDetailsComponent } from '../edit-service/service-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  services=[] ; 
  constructor(private dialog:MatDialog, private globalService:GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.servicesList() ;
  }
  
  servicesList(){
    this.globalService.allServices().subscribe(services=>{
      this.services=services['data'] ;
    })
  }

  onEditCat(service){
    let dialogRef = this.dialog.open( ServiceDetailsComponent, {
      data: service,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>this.servicesList() );
  }

  onDeleteService(service_id) {
    this.spinner.show();
    this.globalService.deleteService(service_id).subscribe(res =>{
     this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الخدمة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.servicesList();
    });
    
  }

}
