import { PaginationParams } from '@abc/shared/model';
import { InjectionToken } from '@angular/core';

export const PAGINATION_PARAMS = new InjectionToken<PaginationParams>(
  'PAGINATION_PARAMS'
);
