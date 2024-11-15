import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinturaContentComponent } from './pintura-content.component';

describe('PinturaContentComponent', () => {
  let component: PinturaContentComponent;
  let fixture: ComponentFixture<PinturaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinturaContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinturaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
