import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { mockComponent } from '../testing/mock-component.utility';
import { TemplateLookup } from '../testing/template-lookup.utility';
import { createTodoListItem } from '../testing/model-factory.utility';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let lookup: TemplateLookup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PieChartComponent,
        mockComponent({
          selector: 'ngx-charts-pie-chart',
          inputs: ['view', 'scheme', 'results', 'legend', 'explodeSlices', 'labels', 'doughnut']
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    lookup = new TemplateLookup(fixture);

    component = fixture.componentInstance;
    component.items = [
      createTodoListItem('Clean the house', true),
      createTodoListItem('Wash the car'),
      createTodoListItem('Cook a meal'),
    ];

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('set items', () => {
    it('should generate a summary of completed and uncompleted', () => {
      expect(component.data).toEqual([
        {
          name: 'Completed',
          value: 1,
        },
        {
          name: 'Uncompleted',
          value: 2,
        },
      ]);
    });
  });

  describe('Component bindings', () => {
    it('should contain a Ngx-charts pie chart', () => {
      const pieChart = lookup.getComponentByCss('ngx-charts-pie-chart');
      expect(pieChart).not.toBeNull();
    });
  });
});
