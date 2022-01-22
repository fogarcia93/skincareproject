import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersMainPage } from './orders-main.page';

describe('OrdersMainPage', () => {
  let component: OrdersMainPage;
  let fixture: ComponentFixture<OrdersMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
