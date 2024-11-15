import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPinturaComponent } from './mostrar-pintura.component';

describe('MostrarPinturaComponent', () => {
  let component: MostrarPinturaComponent;
  let fixture: ComponentFixture<MostrarPinturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPinturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPinturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
