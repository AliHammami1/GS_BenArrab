import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneDepComponent } from './ligne-dep.component';

describe('LigneDepComponent', () => {
  let component: LigneDepComponent;
  let fixture: ComponentFixture<LigneDepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LigneDepComponent]
    });
    fixture = TestBed.createComponent(LigneDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
