import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should be 4', () => {
    // Arrange (Preparacion)
    const numb1 = 1;
    const numb2 = 3;

    // Act (Accion)
    const result = numb1 + numb2;

    // Assert (resultado esperado)
    expect(result).toBe(4);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = fixture.componentInstance;
    expect(appComponent).toBeTruthy();
  });

  it(`should have the 'Hello, zoneless-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hello, zoneless-calculator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, zoneless-calculator',
    );
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render router-outlet with css classes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    const divElement = compiled.querySelector('div');
    const mustHaveClasses =
      'flex flex-col items-center justify-center min-w-screen min-h-screen bg-slate-600 p-5'.split(
        ' ',
      );

    divElement?.classList.forEach((classname) => {
      expect(mustHaveClasses).toContain(classname);
    });
  });

  it('should render buy me a beer link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const linkElement = compiled.querySelector('a');

    expect(linkElement).toBeTruthy();

    const title = linkElement?.getAttribute('title');
    const href = linkElement?.getAttribute('href');
    const target = linkElement?.getAttribute('target');

    expect(title).toBe('Buy me a beer');
    expect(href).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(target).toBe('_blank');
  });
});
