/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserLikesListComponent } from './user-likes-list.component';

describe('UserLikesListComponent', () => {
  let component: UserLikesListComponent;
  let fixture: ComponentFixture<UserLikesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLikesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
