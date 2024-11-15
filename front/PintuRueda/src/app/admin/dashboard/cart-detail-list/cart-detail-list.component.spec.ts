import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailListComponent } from './cart-detail-list.component';

describe('CartDetailListComponent', () => {
  let component: CartDetailListComponent;
  let fixture: ComponentFixture<CartDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDetailListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
