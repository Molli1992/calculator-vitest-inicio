import { TestBed, ComponentFixture } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  template: '<div>MockCalculator</div>',
})
class MockCalculatorComponent {}

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let component: CalculatorViewComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).overrideComponent(CalculatorViewComponent, {
      set: {
        imports: [MockCalculatorComponent],
      },
    });

    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calculator component', () => {
    const calculatorElement = compiled.querySelector('calculator');

    expect(calculatorElement).toBeTruthy();
  });

  it('should contain specific CSS classes in the wrapper div', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses =
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' ',
      );

    divElement?.classList.forEach((classname) => {
      expect(mustHaveClasses).toContain(classname);
    });
  });
});
