import {
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    // attribute: 'hola',
    // 'data-size': 'XL',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  @HostBinding('class.is-command') get commandStyle() {
    return this.isCommand();
  }

  handleClick() {
    console.log('handleClick');
    if (!this.contentValue()?.nativeElement) {
      return;
    }

    const value = this.contentValue()!.nativeElement.textContent ?? '';

    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = (this.contentValue()!.nativeElement.textContent ?? '').trim();

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
