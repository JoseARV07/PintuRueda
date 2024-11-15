import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PikerComponent } from './piker.component';

describe('PikerComponent', () => {
  let component: PikerComponent;
  let fixture: ComponentFixture<PikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PikerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
