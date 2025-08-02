import { InjectionToken } from '@angular/core';
import { PaginationParams } from './page-query-params';

export const PAGINATION_PARAMS = new InjectionToken<PaginationParams>(
  'PAGINATION_PARAMS'
);
