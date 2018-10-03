import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../membership/membership.model';
import { HttpClient } from '@angular/common/http';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import {Location} from '@angular/common';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentsComponent implements OnInit {
public userdatafull:any=[];
id:any='';

products:any=[];
public data = [];
public settings = {
  selectMode: 'single',  //single|multi
  hideHeader: false,
  hideSubHeader: false,
  actions: {
    columnTitle: 'Actions',
    add: true,
    edit: true,
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
    editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
    saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
    cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
  },
  delete: {
    deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
    confirmDelete: true
  },
  noDataMessage: 'No data found',
  columns: {     
    id: {
      title: 'ID',
      editable: false,
      width: '60px',
      type: 'html',
      valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
    },
    firstName: {
      title: 'Name',
      type: 'string',
      filter: true
    },
    lastName: {
      title: 'User Role',
      type: 'string'
    },
    username: {
      title: 'Phone',
      type: 'string'
    },
    email: {
      title: 'Location',
      type: 'string'
    },
    age: {
      title: 'Price',
      type: 'number'
    },
    Brand: {
      title: 'Brand',
      type: 'number'
    },
    Size: {
      title: 'Size',
      type: 'number'
    },
    Qty: {
      title: 'Qty',
      type: 'number'
    }

  },
  pager: {
    display: true,
    perPage: 10
  }
};
public thirdControlModel: number[];
public thirdControlSettings: IMultiSelectSettings = {
  enableSearch: true,
  checkedStyle: 'checkboxes',
  buttonClasses: 'btn btn-secondary btn-block',
  dynamicTitleMaxItems: 3,
  displayAllSelectedText: true
};
public thirdControlTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
  checked: 'item selected',
  checkedPlural: 'items selected',
  searchPlaceholder: 'Find...',
  defaultTitle: 'Select countries using search filter',
  allSelected: 'All selected',
};
public thirdControlOptions: IMultiSelectOption[] = [
  { id: 1, name: 'Sweden'},
  { id: 2, name: 'Norway' },
  { id: 3, name: 'Canada' },
  { id: 4, name: 'USA' }
];
public url = "http://codefacetech.com/demo/gogars/Apis/index.php/";
imgurl= "http://codefacetech.com/demo/gogars/Apis/Images/";
  constructor(private route: ActivatedRoute,public http:HttpClient,public _location:Location) { 
    this.getData((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
      jQuery('.tt').tooltip();
      jQuery('.pp').popover();
   //   this.route.snapshot.paramMap.get('item');
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params)
        // Defaults to 0 if no query param provided.
        this.userdatafull = JSON.parse(params['users']);
        console.log(this.userdatafull)
        
      });
     // this.getuserdetails(this.id);
  }
  backClicked() {
    this._location.back();
}
  public getuserdetails(id){
    this.getUsers(id).subscribe( users => {console.log(users);
      this.userdatafull =users;
      this.products = this.userdatafull.details;
      console.log(this.products);}
      
    );
   
  }
  public getUsers(id){
    return this.http.get<User[]>(this.url+'Getusersdetalis/'+id);
  }
  public getData(data) {
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
