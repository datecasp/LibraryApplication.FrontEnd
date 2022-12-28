import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWithCategoriesComponent } from './book-with-categories.component';

describe('BookWithCategoriesComponent', () => {
  let component: BookWithCategoriesComponent;
  let fixture: ComponentFixture<BookWithCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookWithCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookWithCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
