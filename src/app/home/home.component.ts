import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectService } from '../services/object.service';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ticketNumber:number | undefined;
  isShowingCam:boolean =false;
  qrResultString: string | undefined;
  isLoggedIn:boolean = false;

  keycloakProfile: KeycloakProfile | undefined;
  
  ticketWon: Ticket = new Ticket();

  
  form: FormGroup = this.formBuilder.group({
    ticket : ['', Validators.pattern('^[0-9]+')],
    
  });
 
  constructor(
    public formBuilder: FormBuilder,
    private objectService: ObjectService,
    public keycloakService: KeycloakService,
    private router: Router
  ) { }



  verifyTicket(){
    
    
    if(parseInt(this.form.controls.ticket.value) > 10000){
      this.objectService.getObjects('tickets').subscribe(
        (resp: any) => {
          console.log(resp)
 
          this.ticketWon = resp.find((ticketDb: Ticket) => 
            ticketDb.name == this.form.controls.ticket.value      
        );
        
          if(!this.ticketWon &&  this.form.controls.ticket.dirty){
            this.form.controls.ticket.setErrors({'unknowTicket': true});
          }
          
        }
      );
    }
  }

  observeForm(){
    this.form.valueChanges.subscribe(
      (f)=>{
      console.log(this.form.controls)
      if(this.form.controls.ticket.valid ){
        console.log(this.form.controls.ticket.value)
      }
    
      this.verifyTicket()
      
    })
  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    this.observeForm()
  }


  onCodeResult(scannedInput: string) {
    console.log(scannedInput)
    this.ticketNumber = parseInt(scannedInput)
    this.form.controls['ticket'].setValue(scannedInput);

  }
  
  showCam(){
    if(this.isShowingCam){
      this.isShowingCam = false;
    } else {
      this.isShowingCam = true
    }
  }

  async assignGift(){
    if(this.isLoggedIn){
      this.keycloakProfile = await this.keycloakService.loadUserProfile();
      this.objectService.getCurrentUser(this.keycloakProfile.email+'').subscribe(
        resp => { 
          console.log(resp);
          this.ticketWon.user= resp
          console.log(this.ticketWon)
          this.objectService.saveObject('tickets', this.ticketWon).subscribe(
            resp => { console.log(resp)
              this.router.navigate(['tickets'])
            
            },
            err => { console.log(err)}
          )
        },
        err =>{ console.log(err)},
        () => {}
      )
    } else {
      this.keycloakService.login();
    }
  }
}
