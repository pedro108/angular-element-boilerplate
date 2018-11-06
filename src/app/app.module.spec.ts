import { createCustomElement } from '@angular/elements';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { createCustomElementMockReturn } from '../__mocks__/@angular/elements';

jest.mock('@angular/elements');

describe('AppModule', () => {
  let injectorMock;
  let subject: AppModule;

  beforeEach(() => {
    injectorMock = jest.fn();
    subject = new AppModule(injectorMock);
  });

  describe('constructor', () => {
    it('should create a custom element for the AppComponent', () => {
      expect(createCustomElement)
        .toHaveBeenCalledWith(AppComponent, { injector: injectorMock });

      expect(customElements.get('angular-element')).toEqual(createCustomElementMockReturn);
    });
  });

  describe('#ngDoBootstrap', () => {
    let bootstrapMock;
    let applicationRefMock;

    beforeEach(() => {
      bootstrapMock = jest.fn();
      applicationRefMock = { bootstrap: bootstrapMock };
    });

    describe('when there is an app-root element in the DOM', () => {
      beforeEach(() => {
        document.body.innerHTML = '<div id="app-root"></div>';
        subject.ngDoBootstrap(applicationRefMock);
      });

      it('should bootstrap the application with AppComponent in the app-root element', () => {
        expect(bootstrapMock)
          .toHaveBeenCalledWith(AppComponent, document.getElementById('app-root'));
      });
    });

    describe('when there is no app-root element in the DOM', () => {
      beforeEach(() => {
        document.body.innerHTML = '<div id="not-the-root"></div>';
        subject.ngDoBootstrap(applicationRefMock);
      });

      it('should not run the bootstrap', () => {
        expect(bootstrapMock).not.toHaveBeenCalled();
      });
    });
  });
});
