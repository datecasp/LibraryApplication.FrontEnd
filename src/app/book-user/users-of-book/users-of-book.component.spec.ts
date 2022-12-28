import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOfBookComponent } from './users-of-book.component';

describe('UsersOfBookComponent', () => {
  let component: UsersOfBookComponent;
  let fixture: ComponentFixture<UsersOfBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOfBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOfBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
