import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksOfUserComponent } from './books-of-user.component';

describe('BooksOfUserComponent', () => {
  let component: BooksOfUserComponent;
  let fixture: ComponentFixture<BooksOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksOfUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
