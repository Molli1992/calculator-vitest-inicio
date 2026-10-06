import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { vi } from 'vitest';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);

    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" and lastOperator to "+" when C is pressed', () => {
    service.resultText.set('5');
    service.subResultText.set('5');
    service.lastOperator.set('-');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    service.constructNumber('2');

    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    const operators = ['+', '-', '*', '/', '÷'];
    const value = '15';

    operators.forEach((operator) => {
      service.resultText.set(value);
      service.constructNumber(operator);

      expect(service.resultText()).toBe('0');
      expect(service.subResultText()).toBe(value);
      expect(service.lastOperator()).toBe(operator);
    });
  });

  it('should calculate result correctly for all operators', () => {
    const operators = ['+', '-', '*', '/', '÷'];
    const firstValue = '1';
    const secondValue = '2';

    operators.forEach((operator) => {
      service.constructNumber('C');

      service.constructNumber(firstValue);
      service.constructNumber(operator);
      service.constructNumber(secondValue);
      service.constructNumber('=');

      const a = parseFloat(firstValue);
      const b = parseFloat(secondValue);
      let result = 0;

      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
        case '÷':
          result = a / b;
          break;
      }

      expect(service.resultText()).toBe(result.toString());
    });
  });

  it('should handle backspace', () => {
    service.resultText.set('123');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle backspace with negative numbers', () => {
    service.resultText.set('-12');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('-1');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});

    for (let i = 0; i < 12; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText()).toBe('1111111111');
    expect(service.resultText().length).toBe(10);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle invalid input', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const invalidValue = 'ABC';

    service.constructNumber('1');
    service.constructNumber(invalidValue);

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', invalidValue);
    expect(service.resultText()).toBe('1');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should handle negative zero input correctly', () => {
    service.resultText.set('12');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-12');

    service.resultText.set('-6');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('6');

    service.resultText.set('0');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-0');
  });
});
