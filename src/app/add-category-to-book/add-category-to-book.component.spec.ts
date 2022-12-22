import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryToBookComponent } from './add-category-to-book.component';

describe('AddCategoryToBookComponent', () => {
  let component: AddCategoryToBookComponent;
  let fixture: ComponentFixture<AddCategoryToBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryToBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryToBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
