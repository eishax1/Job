import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestJobPortalComponent } from './test-job-portal.component';

describe('TestJobPortalComponent', () => {
  let component: TestJobPortalComponent;
  let fixture: ComponentFixture<TestJobPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestJobPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestJobPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
