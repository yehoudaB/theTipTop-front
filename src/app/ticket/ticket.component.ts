import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private objectService: ObjectService) { }
  //jai mis lots a la place de tickets pour le moment. mais c pour tester l'api car tickets est vide et il faut que je restructure

  public tickets = this.objectService.getObjects('lots');
  public valueTest:number = 0;
  ngOnInit(): void {
    this.objectService.getObjects('lots').subscribe({
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
    this.showTime()
  }


  showTime(){
    setInterval(() => {        
      this.valueTest  =Math.round(Math.random() * 10)
    }, 1000);
  }
  
}
