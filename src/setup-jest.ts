import 'jest-preset-angular';

declare const global: any;
global.define = () => {};

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});

const customElementsMock = () => {
  const definedElements = {};
  return {
    define(name: string, component: any) {
      definedElements[name] = component;
    },

    get(name: string) {
      return definedElements[name];
    },
  };
};

Object.defineProperty(window, 'customElements', {
  value: customElementsMock(),
});
