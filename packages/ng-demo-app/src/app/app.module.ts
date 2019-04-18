import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {JetStateModule} from '@jetstate/angular';

import {AppComponent} from './app.component';
import {AppState} from './app.state';

@NgModule({
    imports: [BrowserModule, FormsModule, JetStateModule.forRoot([AppState])],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
