import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumourPage } from './humour.page';

describe('HumourPage', () => {
  let component: HumourPage;
  let fixture: ComponentFixture<HumourPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HumourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
