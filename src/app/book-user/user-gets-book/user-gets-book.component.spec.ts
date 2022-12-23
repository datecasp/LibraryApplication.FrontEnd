import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetsBookComponent } from './user-gets-book.component';

describe('UserGetsBookComponent', () => {
  let component: UserGetsBookComponent;
  let fixture: ComponentFixture<UserGetsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGetsBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGetsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
