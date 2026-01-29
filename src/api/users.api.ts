import { APIRequestContext } from '@playwright/test';

export async function fetchUsers(
  request: APIRequestContext,
  pageNumber: number,
) {
  return request.get('users', { params: { page: pageNumber } });
}
