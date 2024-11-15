import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarHerramientaComponent } from './actualizar-herramienta.component';

describe('ActualizarHerramientaComponent', () => {
  let component: ActualizarHerramientaComponent;
  let fixture: ComponentFixture<ActualizarHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarHerramientaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
