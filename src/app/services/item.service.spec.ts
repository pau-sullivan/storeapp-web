import { TestBed, inject } from '@angular/core/testing';

import { ItemService } from './item.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([ItemService], (service: ItemService) => {
    expect(service).toBeTruthy();
  }));
});
