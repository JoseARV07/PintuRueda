import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasContentComponent } from './herramientas-content.component';

describe('HerramientasContentComponent', () => {
  let component: HerramientasContentComponent;
  let fixture: ComponentFixture<HerramientasContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HerramientasContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientasContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
