import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ticket:number | undefined;
  
  form: FormGroup = this.formBuilder.group({
    ticket : ['', Validators.pattern('^[0-9]+')],
    
  });
  constructor(
    public formBuilder: FormBuilder,
  ) { }




  observeForm(){
    this.form.valueChanges.subscribe(
      (f)=>{
      //console.log(this.form.controls)
      if(this.form.controls.ticket.valid ){
        console.log(this.form.controls.ticket.value)
      }
    })
  }

  ngOnInit(): void {
  }

}
