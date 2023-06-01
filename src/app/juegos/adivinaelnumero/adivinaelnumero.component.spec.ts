import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaelnumeroComponent } from './adivinaelnumero.component';

describe('AdivinaelnumeroComponent', () => {
  let component: AdivinaelnumeroComponent;
  let fixture: ComponentFixture<AdivinaelnumeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdivinaelnumeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinaelnumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
