import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreacrumbComponent } from './breacrumb.component';

describe('BreacrumbComponent', () => {
  let component: BreacrumbComponent;
  let fixture: ComponentFixture<BreacrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreacrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreacrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
