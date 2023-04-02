import { BaseColors } from './AppContext';

export const isBaseColors = (object: any): object is BaseColors => {
  return (
    typeof object.primary === 'string' &&
    typeof object.secondary === 'string' &&
    typeof object.tertiary === 'string'
  );
};
