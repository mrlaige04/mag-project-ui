import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNewCard } from './open-new-card';

describe('OpenNewCard', () => {
  let component: OpenNewCard;
  let fixture: ComponentFixture<OpenNewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenNewCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenNewCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
