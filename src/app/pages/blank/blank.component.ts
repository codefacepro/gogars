import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings,uploaddata,Getproductcategory } from './blank.model';
import { BlankService } from './blank.service';
import { MenuService } from '../../theme/components/menu/menu.service';
import { FileUploader } from 'ng2-file-upload';
import {Location} from '@angular/common';
import { ngfModule, ngf } from 'angular-file';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'
import { Subscription } from 'rxjs'
const URL= "http://codefacetech.com/demo/gogars/Apis/index.php/upload/.php";
@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ BlankService, MenuService ]
})
export class BlankComponent implements OnInit {
  accept = '*'
  files:File[] = []
  
  url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  imgurl='http://codefacetech.com/demo/gogars/Apis/Images/'
 
  httpEmitter:Subscription
  public httpEvent:HttpEvent<Event>
  lastFileAt:Date
  imagearr:any='';
  sendableFormData:FormData//populated via ngfFormData directive
  public urls = [];
  //myFormData: FormData
  public progress:number
 public userdata:any=[];
 public editableimages:any='';
public userdatafull:any=[];
  public menuItems:Array<any>;  
  public users: User[];
  public user: User;
  public productcatefull:any=[];
  public productcate:Getproductcategory[];
  public searchText: string;
  public p:any;
  public type:string = 'grid';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  imagedata:any=[];
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
 
  public menuSelectSettings: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-secondary btn-block',
      dynamicTitleMaxItems: 0,
      displayAllSelectedText: true,
      showCheckAll: true,
      showUncheckAll: true
  };

  
  public menuSelectTexts: IMultiSelectTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'menu item selected',
      checkedPlural: 'menu items selected',
      searchPlaceholder: 'Find User type...',
      defaultTitle: 'Multiple select Assign',
      allSelected: 'All selected',
  };
  public menuSelectOptions: IMultiSelectOption[] = [];
  
  constructor(public fb:FormBuilder, 
    public router:Router,
              public toastrService: ToastrService,
              public membershipService:BlankService,
              public menuService:MenuService, 
              private _location: Location,
              public modalService: NgbModal,public http:HttpClient,public HttpClient:HttpClient) {
                
                this.menuSelectOptions=[{ 
                  id: 1, 
                  name: 'sales Executive'
                },
                { 
                  id: 2, 
                  name: 'sales representative'
                },
                { 
                  id: 3, 
                  name: 'Wholesaler'
                },
                { 
                  id: 4, 
                  name: 'Semi wholesaler'
                },
                { 
                  id: 5, 
                  name: 'Buyer'
                }];
   
  }

  ngOnInit() {
   
    this.form = this.fb.group({
        id: null,
        Productname:null,
        productId:[null, Validators.compose([Validators.required])],
        price:[null, Validators.compose([Validators.required])],
        size:[null, Validators.compose([Validators.required])],
        category: [null, Validators.compose([Validators.required])],
        highlights: [null, Validators.compose([Validators.required])],
        image:null,
        Images: null,
        DiscountName:null,
        color: [null, Validators.compose([Validators.required])],
        DiscountAmount:null,
        settings: this.fb.group({
          isActive: null,
          isDeleted: null,
          registrationDate: null,
          joinedDate: null
        }),
      
    });
    this.getUsers(); 
    this.getproductcategory();
  }

  cancel(){
    this.progress = 0
    if( this.httpEmitter ){
      console.log('cancelled')
      this.httpEmitter.unsubscribe()
    }
  }
 
  uploadFiles(files:File[],images){
    console.log(images.join());
   
  
  }
  goviewpage(Item){
    console.log(Item);
    this.router.navigate(['/pages/ui/components'], { queryParams: { users: JSON.stringify(Item) } });
  }
  getDate(){
  console.log(this.files);
    return new Date()
  }
  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event) => {
                this.imagedata = event.target 
                   this.urls.push(this.imagedata.result); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }

  }
  getItems(ev) {
    console.log(ev);
    let val = ev.target.value;
    if (!val || !val.trim()) {

    }
    this.users = this.membershipService.query({
      name: val
    });
    console.log(this.users);
  }
 
  removeimage(i){
    this.urls.splice(i, 1); 
       
  }
  onUpload(){
    const formData: any = new FormData();
    console.log(this.urls);
  //  const files23: Array<File> = files;
    formData.append('files',this.urls , this.urls);
        this.http.post('http://codefacetech.com/demo/gogars/Apis/upload.php', formData,{
          reportProgress: true,
          observe: 'events'
        })
          .subscribe(event => {
            console.log(event); // handle event here
          });
  }
  public getUsers(): void {
    this.membershipService.getUsers().then( users => {console.log(users);
      this.userdatafull =users;
      this.users = this.userdatafull.details;}
      
    );    
  } public getproductcategory(): void {
    this.membershipService.getproductcat().subscribe( users => {console.log(users);
      this.productcatefull =users;
      this.productcate = this.productcatefull.details;}
      
    );    
  }

  public addUser(user:User){
    if(this.files.length!=0){
    this.membershipService.uploadimage(this.sendableFormData).subscribe((result) => {
      console.log(result);
      this.imagearr = result; 
      user.Images=this.imagearr;
      console.log(user.Images);
      this.membershipService.addUser(user).then(user => {
        this.userdata = user;
        if (this.userdata.result == true) {
          this.getUsers();           
          
        }
        else {
            
        }
      });   
     }, (err) => {
     
     });
    }else{
      this.membershipService.addUser(user).then(user => {
        this.userdata = user;
        if (this.userdata.result == true) {
          this.getUsers();           
          
        }
        else {
            
        }
      });
    }
   
  }

  public updateUser(user:User,userimages){
    console.log(this.files);
if(this.files.length!=0){
    this.membershipService.uploadimage(this.sendableFormData).subscribe((result) => {
      console.log(result);
     if(userimages!=''){
      this.imagearr =userimages.join()+','+result;
     }else{
      this.imagearr = result;
     }
      
      console.log(this.imagearr);
      this.form.controls['Images'].setValue(this.imagearr);
      user.Images=this.imagearr;
      console.log(user);
      this.membershipService.updateUser(user).then(user => {
        this.getUsers();      
      });   
     }, (err) => {
     
     });
  
  }else{
    this.imagearr =userimages.join();
    user.Images=this.imagearr;
    this.membershipService.updateUser(user).then(user => {
      this.getUsers();      
    },  
    (err) => {
   
   });
  }
}
  public deleteUser(user:User){
    this.membershipService.deleteUser(user.id).subscribe(result => 
      this.getUsers()
    );
  }

  public toggle(type){
    this.type = type;
  }

  public openMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }

  public closeMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }

  public assignMenuItemsToUser(user){  
    this.updateUser(user,user);
    sessionStorage.setItem('userMenuItems', JSON.stringify(user.menuIds));
    this.toastrService.success('Please, logout and login to see result.', 'Successfully assigned !');
  }

  public openModal(modalContent, user) {
    console.log(user);
    if(user){
      this.user = user;
      this.form.setValue(user);    
     // this.files=user.Images;
      console.log(this.files);
    } 
    else{
      this.user = new User();     
      this.user.settings = new UserSettings();
    }   
    this.modalRef = this.modalService.open(modalContent, { container: '.app' });
    
    this.modalRef.result.then((result) => {
      this.form.reset();
    
    }, (reason) => {
      this.form.reset();
   
    });
  }

  public closeModal(){
    this.modalRef.close();
  }

  public onSubmit(user:User):void {
    if (this.form.valid) {
      if(user.id){
        this.updateUser(user,user.Images);
      }
      else{
        this.addUser(user);
      }      
      this.modalRef.close();    
    }
  } 

}
