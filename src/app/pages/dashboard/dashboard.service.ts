import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class Dashboardservice {
    public url = "http://codefacetech.com/demo/gogars/Apis/index.php/";
    constructor(public http:HttpClient) { }
    public userdata:any=[];
    
   public userdatafull:any=[];
    getUsers() {
        return new Promise((resolve, reject) => {
         
        this.http.get(this.url+'orders')
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

  
} 