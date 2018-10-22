import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private windowService: WindowService) {
  }

  getArray<T>(key: string): T[] {
    const raw = this.getLocalStorage().getItem(key);
    return JSON.parse(raw) as T[];
  }

  persist(key: string, data: any): void {
    const raw = JSON.stringify(data);
    this.getLocalStorage().setItem(key, raw);
  }

  private getLocalStorage(): Storage {
    return this.windowService.getBrowserWindow().localStorage;
  }
}
