import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Setup2fa } from './setup2fa';

describe('Setup2fa', () => {
  let component: Setup2fa;
  let fixture: ComponentFixture<Setup2fa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Setup2fa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Setup2fa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
