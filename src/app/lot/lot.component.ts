import { Component, OnInit } from '@angular/core';
import { LotService } from '../services/lot.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

  constructor(private lotService:LotService) { }

  public lots = this.lotService.getLots();
  public valueTest:number = 0;
  ngOnInit(): void {
    this.lotService.getLots().subscribe({
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
