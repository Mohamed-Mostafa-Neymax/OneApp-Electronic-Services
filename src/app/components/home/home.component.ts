import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

import { GlobalService } from 'src/app/services/global.service';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public timeNow: Date = new Date();
  public welcomePhrase;
  user;
  activeClientsNumber: number;
  activeProvidersNumber: number;

  ads = []
  categories = []
  countries = []
  citties = []
  
  constructor(
    private authentication:AuthenticationService, private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService
    ) { 
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
    console.log(this.user)
  }

  ngOnInit(): void {
    this.getDate();
    this.onGetNumbers()
  }
  getDate(){
    setInterval(() => { this.timeNow = new Date() }, 1);
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12)
      this.welcomePhrase = 'صباح الخير';
    else 
      this.welcomePhrase = 'مساء الخير';
  }

  newOrdersNumber: number;
  prepareOrdersNumber: number;
  finishedOrdersNumber: number;

  onGetNumbers() {
    this.spinner.show();
    this.globalService.listUsers(2, 1).subscribe( users => {
      this.spinner.hide();
      console.log('activeClientsNumber', users);
      this.activeClientsNumber = users['data'].length;
    });
    this.globalService.listUsers(2, 2).subscribe( users => {
      this.spinner.hide();
      console.log('activeProvidersNumber', users);
      this.activeProvidersNumber = users['data'].length;
    });
    this.globalService.listOrders(0).subscribe( ordersRes => {
      console.log('newOrdersNumber', ordersRes);
      this.spinner.hide();
      this.newOrdersNumber = ordersRes['data'].length;
    });
    this.globalService.listOrders(1).subscribe( ordersRes => {
      console.log('prepareOrdersNumber', ordersRes);
      this.spinner.hide();
      this.prepareOrdersNumber = ordersRes['data'].length;
    });
    this.globalService.listOrders(2).subscribe( ordersRes => {
      console.log('finishedOrdersNumber', ordersRes);
      this.spinner.hide();
      this.finishedOrdersNumber = ordersRes['data'].length;
    });
  }
}
