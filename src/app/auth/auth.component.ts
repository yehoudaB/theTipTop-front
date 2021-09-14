import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  logoutUrl = environment.logoutUrl;
  public isLoggedIn = false;
  public keycloakProfile: KeycloakProfile | null = null;
  
  CurrentUserDb!: User;
   
  form: FormGroup = this.formBuilder.group({
    date : [''],
    canEmailMe: []
    
  });

  constructor(
    private readonly keycloakService: KeycloakService,
    public objectService: ObjectService,
    public formBuilder: FormBuilder
    ) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      this.keycloakProfile = await this.keycloakService.loadUserProfile();
      this.updateUserInDb(this.keycloakProfile);
    }

    console.log('keycloak profile: ' , this.keycloakProfile)

    const users = this.objectService.getObjects('users').subscribe(
      resp => { console.log(resp)},
      err => {console.log(err)}
    )
    this.objectService.getCurrentUser(this.keycloakProfile?.email ? this.keycloakProfile?.email : '')
    .subscribe(resp => {
      this.CurrentUserDb = resp
    })

    this.observeForm();
  }
  updateUserInDb(keycloakProfile: KeycloakProfile) {
    const user: User = {
      email: keycloakProfile.email,
      firstName: keycloakProfile.firstName,
      lastName:keycloakProfile.lastName,
      birthDate: undefined,
      canEmailMe: false,
      hadHisGift: false,
      
    }


    
    
      // pour tester sur postman
      console.log('stringify:',JSON.stringify(user));
      console.log('userjs',user);

    this.objectService.saveObjects('users', user).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log(error)
      }
    );
  }


  observeForm(){
    this.form.valueChanges.subscribe(
      (f)=>{
      console.log(this.form.controls)
      if(this.form.controls.date.valid ){
        console.log(Date.parse(this.form.controls.date.value))
        
        this.CurrentUserDb.birthDate = this.form.controls.date.value.toISOString();
        this.CurrentUserDb.canEmailMe = this.form.controls.canEmailMe.value ;

        this.objectService.saveObject('users', this.CurrentUserDb).subscribe(
          resp => { console.log(resp)},
          err => { console.log(err)}
        )
      }
    
      
    })
  }
  public login() {
    this.keycloakService.login();
  }

  public logout() {
    this.keycloakService.logout(this.logoutUrl);
  }
}
