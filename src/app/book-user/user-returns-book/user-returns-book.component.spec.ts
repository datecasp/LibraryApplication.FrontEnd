import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReturnsBookComponent } from './user-returns-book.component';

describe('UserReturnsBookComponent', () => {
  let component: UserReturnsBookComponent;
  let fixture: ComponentFixture<UserReturnsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReturnsBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReturnsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
