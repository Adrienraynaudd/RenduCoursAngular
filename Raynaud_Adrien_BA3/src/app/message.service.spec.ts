import { TestBed } from '@angular/core/testing';

import { SuccessErrorMessageService } from './message.service';

describe('MessageService', () => {
  let service: SuccessErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
