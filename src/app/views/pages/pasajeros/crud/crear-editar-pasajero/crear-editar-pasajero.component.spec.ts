import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarPasajeroComponent } from './crear-editar-pasajero.component';

describe('CrearEditarPasajeroComponent', () => {
  let component: CrearEditarPasajeroComponent;
  let fixture: ComponentFixture<CrearEditarPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarPasajeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
