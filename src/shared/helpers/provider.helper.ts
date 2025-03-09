export const provideClass = (name: symbol, value: any) => ({
  provide: name,
  useClass: value,
});

export const provideVal = (name: symbol, value: any) => ({
  provide: name,
  useValue: value,
});
