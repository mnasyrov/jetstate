import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {JetStateModule} from '@jetstate/angular';

import {AppComponent} from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, JetStateModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
