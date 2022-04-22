import { PaginationParams } from '@abc/shared/api-types';
import { InjectionToken } from '@angular/core';

export const PAGINATION_PARAMS = new InjectionToken<PaginationParams>(
  'PAGINATION_PARAMS'
);
