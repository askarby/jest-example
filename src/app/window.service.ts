import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  getBrowserWindow(): Window {
    return window;
  }
}
