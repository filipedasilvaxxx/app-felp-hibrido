import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviaFotoPage } from './envia-foto.page';

describe('EnviaFotoPage', () => {
  let component: EnviaFotoPage;
  let fixture: ComponentFixture<EnviaFotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviaFotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviaFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
