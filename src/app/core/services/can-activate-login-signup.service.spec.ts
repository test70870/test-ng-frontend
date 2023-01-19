import { TestBed } from '@angular/core/testing';

import { CanActivateLoginSignupService } from './can-activate-login-signup.service';

describe('CanActivateLoginSignupService', () => {
  let service: CanActivateLoginSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateLoginSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
