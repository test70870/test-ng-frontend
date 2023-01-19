import { TestBed } from '@angular/core/testing';

import { CanActivateAuthService } from './can-activate-auth.service';

describe('CanActivateAuthService', () => {
  let service: CanActivateAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
