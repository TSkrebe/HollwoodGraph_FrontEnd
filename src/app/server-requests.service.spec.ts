/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerRequestsService } from './server-requests.service';

describe('Service: ServerRequests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerRequestsService]
    });
  });

  it('should ...', inject([ServerRequestsService], (service: ServerRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
