import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWrapper } from './profile-wrapper';

describe('ProfileWrapper', () => {
  let component: ProfileWrapper;
  let fixture: ComponentFixture<ProfileWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
