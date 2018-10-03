import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from './login.service'
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [LoginService]
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public invalidusername: boolean = false;
    public admindata: any = [];
    constructor(router: Router, fb: FormBuilder, public loginservice: LoginService) {
        this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        this.invalidusername = false;
        if (this.form.valid) {
            this.loginservice.loginadmin(values).then((result) => {
                this.admindata = result;
                if (this.admindata.result == true) {
                    localStorage.setItem('userdata', JSON.stringify(this.admindata.details));
                    this.router.navigateByUrl('/');
                }
                else {
                    this.invalidusername = true;
                }

            }, (err) => {
                this.invalidusername = true;
            });;
        }
    }

    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

}
