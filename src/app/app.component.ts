import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { WindowRef } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  title = 'The Tip Top';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRef: WindowRef
   ){}
   ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      // Use the window reference: this.windowRef
     Eg: this.windowRef.nativeWindow.location.pathname
    }
     
   }
}

