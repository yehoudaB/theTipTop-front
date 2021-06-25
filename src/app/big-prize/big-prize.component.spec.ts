import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPrizeComponent } from './big-prize.component';

describe('BigPrizeComponent', () => {
  let component: BigPrizeComponent;
  let fixture: ComponentFixture<BigPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigPrizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
