import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationsList } from './verifications-list';

describe('VerificationsList', () => {
  let component: VerificationsList;
  let fixture: ComponentFixture<VerificationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
