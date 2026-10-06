import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let component: CalculatorComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CalculatorComponent],
    });

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
