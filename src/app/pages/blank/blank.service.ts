import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,uploaddata,Getproductcategory} from './blank.model';

@Injectable()
export class BlankService {
    public url = "http://codefacetech.com/demo/gogars/Apis/index.php/";
    constructor(public http:HttpClient) { }
    public userdata:any=[];
    
   public userdatafull:any=[];
    getUsers() {
        return new Promise((resolve, reject) => {
         
        this.http.get(this.url+'Getproducts')
        .subscribe(
          (val) => {
            this.userdatafull=val;
            this.userdata=this.userdatafull.details;

              console.log("POST call successful value returned in body",
                          val);
                          resolve(val);
                                  },
          response => {
              console.log("POST call in error", response);
              reject(response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
        });
    }
    getproductcat(): Observable<Getproductcategory[]>{
        return this.http.get<Getproductcategory[]>(this.url+'Getproductcategory');
    }
    addUser(user:User){	    
console.log(user);

return new Promise((resolve, reject) => {
    this.http.post(this.url+'AddProduct',JSON.stringify(user))
  .subscribe(
    (val) => {
        console.log("POST call successful value returned in body",
                    val);
                    resolve(val);
                            },
    response => {
        console.log("POST call in error", response);
        reject(response);
    },
    () => {
        console.log("The POST observable is now completed.");
    });
  });
       // return this.http.post(this.url, user);
    }

    updateUser(user:User){
        return new Promise((resolve, reject) => {
        this.http.post(this.url+'Editproduct',JSON.stringify(user))
        .subscribe(
          (val) => {
              console.log("POST call successful value returned in body",
                          val);
                          resolve(val);
                                  },
          response => {
              console.log("POST call in error", response);
              reject(response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
        });
    }

    deleteUser(id: number) {  
       
        return this.http.post(this.url+'Deleteproduct',JSON.stringify({id:id}));
      
    }
    uploadimage(val){
        console.log(val);
        return this.http.post("http://codefacetech.com/demo/gogars/Apis/upload.php",val, {
            reportProgress: true//, responseType: 'text'
          });
    }
    onUpload(files:uploaddata) {
        // this.http is the injected HttpClient
        const formData: any = new FormData();
  //  const files23: Array<File> = files;
    formData.append('files',files , files.name);
        this.http.post('http://codefacetech.com/demo/gogars/Apis/upload.php', formData,{
          reportProgress: true,
          observe: 'events'
        })
          .subscribe(event => {
            console.log(event); // handle event here
          });
      }
    query(params?: any) {

    if (!params && params==undefined) {
      return this.userdata;
    }

    return this.userdata.filter((item) => {
      console.log(item)
      for (let key in params) {
        let field = item[key];

        console.log(params[key]);
        if(params[key]==undefined){
          return this.userdata;
        }else{
            console.log('else');
          if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              console.log(item)
            return item;
          } else if (field == params[key]) {
            console.log(item)
            return item;
          }
        }

      }
    //  return null;
    });


  }
} 