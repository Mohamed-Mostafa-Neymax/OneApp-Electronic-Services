import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditCountryComponent } from '../edit-country/edit-country.component';
@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss']
})
export class ListCountryComponent implements OnInit {
  countries=[];
  constructor(private dialog:MatDialog, private globalService: GlobalService , private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
   this.loadList();
  }

  loadList(){
      this.globalService.allCountries().subscribe(countries=>{
        this.countries=countries['data'] ;
        })
    }

   onEditCountry(country) {
       let dialogRef = this.dialog.open(EditCountryComponent, {
          data:country,
          height: '600px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe( res => {
          this.loadList();
        })
      }
   
   onDeleteCountry(id) {
    this.spinner.show();
    this.globalService.deleteCountry(id).subscribe(res =>{
     this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الدولة بنجاح',
        'success'
      )
      this.dialog.closeAll();
     
      this.loadList();
    });
    
  }
}
