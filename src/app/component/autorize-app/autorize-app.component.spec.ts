import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizeAppComponent } from './autorize-app.component';

describe('AutorizeAppComponent', () => {
  let component: AutorizeAppComponent;
  let fixture: ComponentFixture<AutorizeAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizeAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
