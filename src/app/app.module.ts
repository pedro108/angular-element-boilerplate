import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [ AppComponent ],
})
export class AppModule {
  constructor(protected injector: Injector) {
    const appComponent = createCustomElement(AppComponent, { injector });
    customElements.define('angular-element', appComponent);
  }

  ngDoBootstrap(app: ApplicationRef) {
    const appRootElement = document.querySelector('#app-root');
    if (appRootElement) {
      app.bootstrap(AppComponent, appRootElement);
    }
  }
}
