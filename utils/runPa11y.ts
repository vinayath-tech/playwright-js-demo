import { Page, expect } from '@playwright/test';
import { checkA11y, getViolations, reportViolations } from 'axe-playwright';

let page: Page;

export async function runPa11y(page){
    await checkA11y(page, {
        detailedReport: true,
        detailedReportOptions: {
            html: true
        },
        axeOptions: {
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa'],
            }
        }
    })
}

export async function getViolation(page){
    const violations = await getViolations(page, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a'],
          },
      });
      
    expect(violations.length).toBe(0)
}