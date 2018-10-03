import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './login.model';

@Injectable()
export class LoginService {
    public url = "api/users";
    public baseurl="http://codefacetech.com/demo/gogars/Apis/index.php/"
    constructor(public http:HttpClient) { }
    loginadmin(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http.post(this.baseurl+'Adduser',JSON.stringify(data))
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
      login(data): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    addUser(user:User){	    
        return this.http.post(this.url, user);
    }

    updateUser(user:User){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    }
} 