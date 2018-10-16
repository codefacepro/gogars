import { Component, ViewEncapsulation } from '@angular/core';
import { Dashboardservice } from './dashboard.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ Dashboardservice ]
})
export class DashboardComponent  {
  public data:any = [];
  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      // edit: true,
      delete: true,
      custom: [],
      position: 'right' // left|right
    },
    add: {     
      addButtonContent: '<h4 class="mb-1"><i class="fa fa-plus ml-3 text-success"></i></h4>',
      createButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    edit: {
       editButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {     
      cartId: {
        title: 'ID',
        editable: false,
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      firstname: {
        title: 'Name',
        type: 'string',
        filter: true
      },
      position: {
        title: 'User Role',
        type: 'string'
      },
      contact: {
        title: 'Phone',
        type: 'string'
      },
      address: {
        title: 'Location',
        type: 'string'
      },
      price: {
        title: 'Price',
        type: 'number'
      },
      Productname: {
        title: 'Product',
        type: 'number'
      },
      ordersize: {
        title: 'Size',
        type: 'number'
      },
      Quantity: {
        title: 'Qty',
        type: 'number'
      }
  
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  constructor(public dashservice:Dashboardservice) { 
    this.dashservice.getUsers().then( users => {console.log(users);
      this.data =users;
      this.data = this.data.details;}
      
    );   
    // this.getData((data) => {
    //   this.data = data;
    //   console.log(this.data);
    // });
  }
  public getData(data) {
    console.log(data);
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/users.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onRowSelect(event){
   // console.log(event);
  }

  public onUserRowSelect(event){
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event){
    //console.log(event);
  }
}
