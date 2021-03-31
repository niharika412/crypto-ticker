import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurDetailsComponent } from './cur-details.component';

describe('CurDetailsComponent', () => {
  let component: CurDetailsComponent;
  let fixture: ComponentFixture<CurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
