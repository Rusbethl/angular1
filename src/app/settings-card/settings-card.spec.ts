import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCard } from './settings-card';

describe('SettingsCard', () => {
  let component: SettingsCard;
  let fixture: ComponentFixture<SettingsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
