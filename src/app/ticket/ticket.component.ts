import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  keycloakProfile: KeycloakProfile | undefined;

  constructor(
    private objectService: ObjectService,
    public keycloakService: KeycloakService) { }

  public tickets = this.objectService.getObjects('tickets');
  public valueTest:number = 0;
  async ngOnInit(): Promise<void> {
    this.keycloakProfile = await this.keycloakService.loadUserProfile();



    this.objectService.getObjects('tickets').subscribe({
      next(value: any){
        console.log(value)
      },
      error(error: any) {
        console.error(error);
      },
      complete() {
        console.log("complete");
      }
    })
  }


  
}
