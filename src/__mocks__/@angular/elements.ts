export const createCustomElement = jest.fn();

export const createCustomElementMockReturn = jest.fn();

createCustomElement.mockImplementation(() => {
  return createCustomElementMockReturn;
});
