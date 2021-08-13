import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

  constructor(private objectService:ObjectService) { }

  public lots = this.objectService.getObjects('lots');
  public valueTest:number = 0;
  ngOnInit(): void {
    this.objectService.getObjects('lots').subscribe({
      next(value){
        console.log(value)
      },
      error(error) {
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
