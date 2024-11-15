import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPinturaComponent } from './actualizar-pintura.component';

describe('ActualizarPinturaComponent', () => {
  let component: ActualizarPinturaComponent;
  let fixture: ComponentFixture<ActualizarPinturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarPinturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPinturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
