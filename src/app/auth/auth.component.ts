import { Component, OnInit } from '@angular/core';
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

  constructor(
    private readonly keycloakService: KeycloakService,
    public objectService: ObjectService
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

  public login() {
    this.keycloakService.login();
  }

  public logout() {
    this.keycloakService.logout(this.logoutUrl);
  }
}
