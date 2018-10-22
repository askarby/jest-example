import { getTestBed, TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { WindowService } from './window.service';
import createSpyObj = jasmine.createSpyObj;

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  let windowService: WindowService;
  let window;

  beforeEach(() => {
    window = {
      localStorage: createSpyObj('LocalStorage', ['getItem', 'setItem']),
    };

    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        {
          provide: WindowService,
          useValue: {
            getBrowserWindow: () => window,
          } as WindowService
        },
      ],
    });
  });

  beforeEach(() => {
    const injector = getTestBed();
    localStorageService = injector.get(LocalStorageService);
    windowService = injector.get(WindowService);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  describe('getArray', () => {
    it('should retrieve array-data from LocalStorage', () => {
      const rawData = '["a", "b", "c"]';
      window.localStorage.getItem.and.returnValue(rawData);
      expect(localStorageService.getArray('key')).toEqual(['a', 'b', 'c']);
    });
  });

  describe('persist', () => {
    it('should persist data to LocalStorage', () => {
      const key = 'key';
      const array = ['a', 'b', 'c'];
      localStorageService.persist(key, array);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(key, '["a","b","c"]');
    });
  });
});
