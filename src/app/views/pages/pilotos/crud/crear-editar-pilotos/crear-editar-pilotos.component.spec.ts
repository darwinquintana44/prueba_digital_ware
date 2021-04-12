import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarPilotosComponent } from './crear-editar-pilotos.component';

describe('CrearEditarPilotosComponent', () => {
  let component: CrearEditarPilotosComponent;
  let fixture: ComponentFixture<CrearEditarPilotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarPilotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarPilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
