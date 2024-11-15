import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHerramientaComponent } from './mostrar-herramienta.component';

describe('MostrarHerramientaComponent', () => {
  let component: MostrarHerramientaComponent;
  let fixture: ComponentFixture<MostrarHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarHerramientaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
