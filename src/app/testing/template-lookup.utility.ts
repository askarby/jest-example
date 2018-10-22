import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

export class TemplateLookup {
  constructor(private fixture: ComponentFixture<any>) {

  }

  getSingleElementByCss(cssQuery: string): HTMLElement {
    const debugElement = this.fixture.debugElement.query(By.css(cssQuery));
    return debugElement == null ? null : debugElement.nativeElement as HTMLElement;
  }

  getMultipleElementsByCss(cssQuery: string): HTMLElement[] {
    return this.fixture.debugElement.queryAll(By.css(cssQuery))
      .map(e => e.nativeElement as HTMLElement);
  }

  getComponent<T>(component: Type<T>): T {
    return this.getDebugElementFromType(component).componentInstance as T;
  }

  getComponentByCss<T>(query: string): T {
    return this.getDebugElementFromCss(query).componentInstance as T;
  }

  getComponentElement<T>(component: Type<T>): T {
    return this.getDebugElementFromType(component).nativeElement;
  }

  private getDebugElementFromType<T>(component: Type<T>): DebugElement {
    return this.fixture.debugElement.query(By.directive(component));
  }

  private getDebugElementFromCss<T>(query: string): DebugElement {
    return this.fixture.debugElement.query(By.css(query));
  }
}
