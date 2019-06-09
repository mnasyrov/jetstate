import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'zone.js';
import {AppModule} from './app/app.module';

if (process.env.NODE_ENV) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
