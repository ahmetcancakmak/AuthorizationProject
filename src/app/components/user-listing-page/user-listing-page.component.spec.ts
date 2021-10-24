import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListingPageComponent } from './user-listing-page.component';

describe('UserListingPageComponent', () => {
  let component: UserListingPageComponent;
  let fixture: ComponentFixture<UserListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
