import { expect, test } from '@playwright/test';
import { fetchUsers } from '../src/api/users.api';
import { REGULATORY_RULES } from '../src/rules/regulatory.rules';

test('All ingested records are complete', async ({ request }, testInfo) => {
  testInfo.annotations.push({
    type: 'regulatory-rule',
    description: REGULATORY_RULES.DATA_COMPLETENESS,
  });

  const response = await fetchUsers(request, 2);
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);

  body.data.forEach((u: any) => {
    expect(u.email).not.toBeNull();
    expect(u.first_name).not.toBeNull();
    expect(u.last_name).not.toBeNull();
  });
});
