import { expect, test } from '@playwright/test';
import { fetchUsers } from '../src/api/users.api';
import { REGULATORY_RULES } from '../src/rules/regulatory.rules';
import { userSchema } from '../src/schemas/user.schema';
import { validateSchema } from '../src/utils/schemaValidator';

test.describe('Regulatory Accuracy Validation', () => {
  test('User records conform to regulatory schema', async ({
    request,
  }, testInfo) => {
    testInfo.annotations.push({
      type: 'regulatory-rule',
      description: REGULATORY_RULES.SCHEMA_ACCURACY,
    });

    const response = await fetchUsers(request, 2);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);

    body.data.forEach((user: any) => {
      validateSchema(userSchema, user);
    });
  });
});
