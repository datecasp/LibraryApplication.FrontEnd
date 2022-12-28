import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOfBookComponent } from './categories-of-book.component';

describe('CategoriesOfBookComponent', () => {
  let component: CategoriesOfBookComponent;
  let fixture: ComponentFixture<CategoriesOfBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesOfBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesOfBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
