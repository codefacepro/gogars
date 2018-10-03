import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './membership.model';
import { category } from './membership.model';

@Injectable()
export class MembershipService {
    public url = "http://codefacetech.com/demo/gogars/Apis/index.php/";
    public baseurl="http://codefacetech.com/demo/gogars/Apis/index.php";
    public emailUrl="http://codefacetech.com/demo/gogars/Apis/sendEmail.php";
    constructor(public http:HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url+'Getusers');
    }
    getcategory(): Observable<category[]> {
        return this.http.get<category[]>(this.url+'Getcategory');
    }
    sendEmail(message: User): Observable<User> | any {
        return this.http.post(this.emailUrl, message)
          .map(response => {
            console.log('Sending email was successfull', response);
            return response;
          })
          .catch(error => {
            console.log('Sending email got error', error);
            return Observable.throw(error)
          })
      }
    addUser(user:User){	    
console.log(user);

return new Promise((resolve, reject) => {
    this.http.post(this.baseurl+'/Adduser',JSON.stringify(user))
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
        this.http.post(this.baseurl+'/EditUser',JSON.stringify(user))
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
       
        return this.http.post(this.url+'DeleteUser',JSON.stringify({id:id}));
      
    }
} 