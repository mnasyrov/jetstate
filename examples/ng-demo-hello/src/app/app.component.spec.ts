import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {JetStateModule} from '@jetstate/angular';
import {AppComponent} from './app.component';
import {AppState} from './app.state';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, JetStateModule.forRoot({states: [AppState]})],
            declarations: [AppComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
    }));

    it('should create the app', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have 'message' as 'Hello World!' by default`, async(async () => {
        const app = fixture.componentInstance;
        expect(await app.message$.toPromise()).toEqual('Hello World!');
    }));

    it(`should have 'userName' as 'World' by default`, async(async () => {
        const app = fixture.componentInstance;
        expect(await app.userName$.toPromise()).toEqual('World');
    }));

    it(`should set 'userName' to 'TestUser'`, async(async () => {
        const app = fixture.componentInstance;
        app.setUserName('TestUser');
        expect(await app.userName$.toPromise()).toEqual('TestUser');
        expect(await app.message$.toPromise()).toEqual('Hello TestUser!');
    }));

    it(`should have 'isUpperCase$' as 'false' by default`, async(async () => {
        const app = fixture.componentInstance;
        expect(await app.isUpperCase$.toPromise()).toEqual(false);
    }));

    it(`should set 'isUpperCase$' to 'true'`, async(async () => {
        const app = fixture.componentInstance;
        app.setUpperCase(true);
        expect(await app.isUpperCase$.toPromise()).toEqual(true);
        expect(await app.message$.toPromise()).toEqual('HELLO WORLD!');
    }));

    it('should render title in a h1 tag', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#message').textContent).toContain('Hello World!');
    });
});
