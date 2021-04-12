import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarAeronavesComponent } from './crear-editar-aeronaves.component';

describe('CrearEditarAeronavesComponent', () => {
  let component: CrearEditarAeronavesComponent;
  let fixture: ComponentFixture<CrearEditarAeronavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarAeronavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarAeronavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
