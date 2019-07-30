import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {JetStateModule} from '@jetstate/angular';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, JetStateModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 'message' as 'Hello World!' by default`, async(async () => {
    const app = fixture.componentInstance;
    expect(app.message.value).toEqual('Hello World!');
  }));

  it(`should have 'userName' as 'World' by default`, async(async () => {
    const app = fixture.componentInstance;
    expect(app.userName.value).toEqual('World');
  }));

  it(`should set 'userName' to 'TestUser'`, async(async () => {
    const app = fixture.componentInstance;
    app.setUserName('TestUser');
    expect(app.userName.value).toEqual('TestUser');
    expect(app.message.value).toEqual('Hello TestUser!');
  }));

  it(`should have 'isUpperCase' as 'false' by default`, async(async () => {
    const app = fixture.componentInstance;
    expect(app.isUpperCase.value).toEqual(false);
  }));

  it(`should set 'isUpperCase' to 'true'`, async(async () => {
    const app = fixture.componentInstance;
    app.setUpperCase(true);
    expect(app.isUpperCase.value).toEqual(true);
    expect(app.message.value).toEqual('HELLO WORLD!');
  }));

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#message').textContent).toContain(
      'Hello World!',
    );
  });
});
