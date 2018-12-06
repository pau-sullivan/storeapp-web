import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, HttpClientTestingModule],
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
