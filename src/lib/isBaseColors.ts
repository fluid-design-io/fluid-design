import { BaseColors } from './AppContext';

export const isBaseColors = (object: any): object is BaseColors => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }
  return (
    typeof object.primary === 'string' &&
    typeof object.secondary === 'string' &&
    typeof object.tertiary === 'string'
  );
};
