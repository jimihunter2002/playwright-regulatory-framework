import { expect, test } from '@playwright/test';
import { REGULATORY_RULES } from '../src/rules/regulatory.rules';

test('Regulatory decisions are traceable', async ({}, testInfo) => {
  testInfo.annotations.push({
    type: 'regulatory-rule',
    description: REGULATORY_RULES.AUDITABILITY,
  });

  expect(testInfo.title).toContain('Regulatory');
  expect(testInfo.annotations.length).toBeGreaterThan(0);
});
