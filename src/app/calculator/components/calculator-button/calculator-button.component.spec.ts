import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content">Test content</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;
  let hostCss: DOMTokenList;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    });

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    hostCss = compiled.classList;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double size is false', () => {
    fixture.componentRef.setInput('isDoubleSize', false);

    expect(hostCss).toContain('w-1/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    expect(hostCss).toContain('w-2/4');
  });

  it('should apply is-command class when isCommand is true', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();

    expect(hostCss).toContain('is-command');
  });

  it('should emit onClick when handleClick is called', () => {
    const spy = vi.spyOn(component.onClick, 'emit');
    const buttonElement = compiled.querySelector('button');

    expect(buttonElement).toBeTruthy();

    buttonElement!.innerHTML = ' 9 ';
    buttonElement!.click();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('9');
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', () => {
    vi.useFakeTimers();
    component.contentValue()!.nativeElement.textContent = '1';

    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBe(true);

    vi.advanceTimersByTime(100);
    expect(component.isPressed()).toBe(false);

    vi.useRealTimers();
  });

  it('should NOT set isPressed if key does not match', () => {
    component.contentValue()!.nativeElement.textContent = '1';

    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBe(false);
  });

  it('should display projected content', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const hostCompiled = hostFixture.nativeElement as HTMLElement;
    const projectedContent = hostCompiled.querySelector('.projected-content');

    expect(projectedContent).toBeTruthy();
    expect(projectedContent?.textContent).toBe('Test content');
  });
});
