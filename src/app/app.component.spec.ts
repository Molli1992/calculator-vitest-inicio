import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Hello, zoneless-calculator' title`, () => {
    expect(component.title).toEqual('Hello, zoneless-calculator');
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, zoneless-calculator',
    );
  });

  it('should render router-outlet', () => {
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render router-outlet with css classes', () => {
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
