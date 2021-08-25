import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectService } from '../services/object.service';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ticketNumber:number | undefined;
  isShowingCam:boolean =false;
  qrResultString: string | undefined;

  
  ticketWon: Ticket | undefined;

  
  form: FormGroup = this.formBuilder.group({
    ticket : ['', Validators.pattern('^[0-9]+')],
    
  });
 
  constructor(
    public formBuilder: FormBuilder,
    private objectService: ObjectService
  ) { }



  verifyTicket(){
    
    
    if(parseInt(this.form.controls.ticket.value) > 10000){
      this.objectService.getObjects('tickets').subscribe(
        (resp: any) => {
          console.log(resp)
 
          this.ticketWon = resp.find((ticketDb: Ticket) => 
            ticketDb.name == this.form.controls.ticket.value      
        );
        console.log('aaaa'+ this.ticketWon)
        
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

  ngOnInit(): void {
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
}
