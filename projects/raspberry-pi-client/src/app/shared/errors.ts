import { APP_ERRORS } from '../app.constants';

export interface AppError extends Error {
  message: string;
  readonly code: number;
  stack?: string | undefined;
}

export class MissingServerError implements AppError {
  name = 'MissingServerError';
  message = APP_ERRORS.NO_SERVER;
  readonly code = 1;
}
