import { TestBed } from '@angular/core/testing';

import { Breakfast } from './breakfast';

describe('Breakfast', () => {
  let service: Breakfast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Breakfast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
