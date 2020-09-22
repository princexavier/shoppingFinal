import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShppingCartItemComponent } from './shpping-cart-item.component';

describe('ShppingCartItemComponent', () => {
  let component: ShppingCartItemComponent;
  let fixture: ComponentFixture<ShppingCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShppingCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShppingCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
