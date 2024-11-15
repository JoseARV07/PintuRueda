import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHerramientaComponent } from './crear-herramienta.component';

describe('CrearHerramientaComponent', () => {
  let component: CrearHerramientaComponent;
  let fixture: ComponentFixture<CrearHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearHerramientaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
