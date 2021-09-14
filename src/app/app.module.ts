import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LotComponent } from './lot/lot.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TicketComponent } from './ticket/ticket.component';
import { BigPrizeComponent } from './big-prize/big-prize.component';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatButtonModule} from '@angular/material/button';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
  function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'https://key.dsp4-5archio19-ah-je-gh-yb.fr/auth',
          realm: 'theTipTop',
          clientId: 'theTipTop-web',
          
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          flow: 'implicit'
        },
      });
      
  }

@NgModule({
  declarations: [ 
    AppComponent,
    LotComponent,
    HomeComponent,
    AuthComponent,
    NavbarComponent,
    TicketComponent,
    BigPrizeComponent
  ],
  imports: [
    BrowserModule,
    NgxSimpleCountdownModule,
    MatDatepickerModule,
    AppRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    MatIconModule,
    MatCardModule,
    BrowserModule,
    MatFormFieldModule ,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    NgxSimpleCountdownModule,
    ZXingScannerModule,
    MatInputModule,
    MatIconModule,
    AppRoutingModule, BrowserAnimationsModule, MatIconModule, MatIconModule, MatCardModule, MatCardModule, ReactiveFormsModule, MatIconModule,
    
 

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }