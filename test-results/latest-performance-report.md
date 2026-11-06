# PMS UI and Performance Audit

- Generated: 2026-11-06T19:24:59.086Z
- Base URL: http://127.0.0.1:4173/PRSPRO2/
- Mode: authenticated-read-only
- Overall: **needs-attention**

## Summary

| Metric | Result |
|---|---:|
| requestedRoutes | 20 |
| loadedRoutes | 20 |
| permissionDeniedRoutes | 0 |
| failedRoutes | 0 |
| mobileRoutesWithHorizontalOverflow | 0 |
| visibleFormsInventoried | 12 |
| dynamicFormsInventoried | 11 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 136 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 268 |
| procurementApiRequestsMeasured | 1 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 0 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 2896 | 5555 | 0 | 4 | 2 | no |
| projects | loaded | 3422 | 6078 | 0 | 1 | 2 | no |
| project-detail | loaded | 3394 | 6050 | 0 | 2 | 0 | no |
| print-design | loaded | 3889 | 6548 | 1 | 14 | 5 | no |
| print-output | loaded | 3395 | 6052 | 0 | 1 | 2 | no |
| events | loaded | 3389 | 6046 | 0 | 7 | 2 | no |
| workflows | loaded | 3916 | 6574 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3378 | 6034 | 0 | 1 | 1 | no |
| event-types | loaded | 3882 | 6544 | 0 | 58 | 1 | no |
| information-types | loaded | 3382 | 6039 | 0 | 1 | 1 | no |
| procurement | loaded | 8076 | 15733 | 0 | 0 | 0 | no |
| attachments | loaded | 3380 | 6037 | 0 | 1 | 2 | no |
| reports | loaded | 4389 | 7050 | 0 | 8 | 12 | no |
| users | loaded | 3883 | 6540 | 0 | 23 | 1 | no |
| departments | loaded | 3400 | 6058 | 0 | 8 | 1 | no |
| roles | loaded | 3383 | 6040 | 0 | 1 | 1 | no |
| permissions | loaded | 4888 | 7545 | 0 | 0 | 1 | no |
| audit | loaded | 5399 | 8056 | 0 | 1 | 1 | no |
| settings | loaded | 3389 | 6045 | 0 | 1 | 3 | no |
| admin | loaded | 3379 | 6037 | 0 | 3 | 2 | no |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.
- Procurement diagnostic benchmark did not complete: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /سنجش.*مسیر تأمین/ }).first() to be visible


## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
