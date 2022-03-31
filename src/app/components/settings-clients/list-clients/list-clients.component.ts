import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  usersArr = [];
  userStatus = 'blocked';
  userType = 'client';

  status_id = 0;
  user_type = 1;

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.onListUsers();
    console.log('status_id =', this.status_id, 'user_type =', this.user_type);
  }

  onChooseUserStatus(status_id: number, user_status: string) {
    this.userStatus = user_status;
    this.status_id = status_id;
    console.log('status_id =', this.status_id, 'user_type =', this.user_type);
    this.onListUsers();
  }
  onChooseUserType(user_status_type: number, user_type: string) {
    this.userType = user_type;
    this.user_type = user_status_type;
    console.log('status_id =', this.status_id, 'user_type =', this.user_type);
    this.onListUsers();
  }

  onListUsers() {
    this.spinner.show();
    this.globalService.listUsers(this.status_id, this.user_type).subscribe( listUsersRes => {
      this.spinner.hide();
      console.log('listUsersRes', listUsersRes);
      this.usersArr = listUsersRes['data'];
    });
  }


  onUpdateUser(user_id: number, status_id: number) {
    this.spinner.show();
    this.globalService.manageUsers(user_id, status_id).subscribe( updateUserRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم تعديل حالة المستخدم بنجاح',
        'success'
      );
      console.log('updateUserRes', updateUserRes);
      this.onListUsers();
    });
  }

}
