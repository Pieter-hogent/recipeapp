import { TestBed } from '@angular/core/testing';

import { RecipeDataService } from './recipe-data.service';

describe('RecipeDataService', () => {
  let service: RecipeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
