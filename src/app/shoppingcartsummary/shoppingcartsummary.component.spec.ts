import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartsummaryComponent } from './shoppingcartsummary.component';

describe('ShoppingcartsummaryComponent', () => {
  let component: ShoppingcartsummaryComponent;
  let fixture: ComponentFixture<ShoppingcartsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingcartsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
