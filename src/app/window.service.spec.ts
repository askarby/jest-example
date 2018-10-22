import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { WindowService } from './window.service';

describe('WindowService', () => {
  let service: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowService]
    });
  });

  beforeEach(() => {
    const injector = getTestBed();
    service = injector.get(WindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBrowserWindow', () => {
    it('should retrieve window-object from browser', () => {
      expect(service.getBrowserWindow()).toBe(window);
    });
  });
});
