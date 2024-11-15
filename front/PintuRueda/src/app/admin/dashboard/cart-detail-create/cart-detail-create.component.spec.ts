import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailCreateComponent } from './cart-detail-create.component';

describe('CartDetailCreateComponent', () => {
  let component: CartDetailCreateComponent;
  let fixture: ComponentFixture<CartDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDetailCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
