import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPinturaComponent } from './crear-pintura.component';

describe('CrearPinturaComponent', () => {
  let component: CrearPinturaComponent;
  let fixture: ComponentFixture<CrearPinturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPinturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPinturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
