import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailUpdateComponent } from './cart-detail-update.component';

describe('CartDetailUpdateComponent', () => {
  let component: CartDetailUpdateComponent;
  let fixture: ComponentFixture<CartDetailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDetailUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
