import { Component, OnInit } from '@angular/core';
import { LotService } from '../services/lot.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

  constructor(private lotService:LotService) { }

  public lots:any;
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

    console.log(this.lots)
  }



}
