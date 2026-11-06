# PMS UI and Performance Audit

- Generated: 2026-11-06T20:54:25.376Z
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
| networkRequestsMeasured | 319 |
| procurementApiRequestsMeasured | 7 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 4410 | 7067 | 0 | 8 | 2 | no |
| projects | loaded | 3885 | 6543 | 0 | 1 | 2 | no |
| project-detail | loaded | 3892 | 6550 | 0 | 2 | 0 | no |
| print-design | loaded | 3377 | 6034 | 1 | 14 | 5 | no |
| print-output | loaded | 5390 | 8046 | 0 | 1 | 2 | no |
| events | loaded | 3920 | 6574 | 0 | 7 | 2 | no |
| workflows | loaded | 5908 | 8564 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5422 | 8080 | 0 | 1 | 1 | no |
| event-types | loaded | 2883 | 5545 | 0 | 58 | 1 | no |
| information-types | loaded | 3367 | 6024 | 0 | 1 | 1 | no |
| procurement | loaded | 3396 | 27293 | 0 | 9 | 0 | no |
| attachments | loaded | 4379 | 7034 | 0 | 10 | 2 | no |
| reports | loaded | 3379 | 6040 | 0 | 8 | 12 | no |
| users | loaded | 3396 | 6054 | 0 | 1 | 1 | no |
| departments | loaded | 3877 | 6533 | 0 | 8 | 1 | no |
| roles | loaded | 5416 | 8071 | 0 | 1 | 1 | no |
| permissions | loaded | 4373 | 7029 | 0 | 0 | 1 | no |
| audit | loaded | 2872 | 5529 | 0 | 1 | 1 | no |
| settings | loaded | 3380 | 6036 | 0 | 1 | 3 | no |
| admin | loaded | 3909 | 6567 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-06T20:57:03.119Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4833 ms | 3063 ms | /د/س/ت/ر/س/ی/ /1/5/9/2/ /// /ر/و/ت/ر/ /1/4/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/7/m/s/×/1/ |
| /procurement/orders | 4574 ms | 2902 ms | /د/س/ت/ر/س/ی/ /2/0/0/4/ /// /ر/و/ت/ر/ /8/9/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/3/7/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/5/0/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/7/m/s/×/1/ |
| /procurement/needs | 3384 ms | 1902 ms | /د/س/ت/ر/س/ی/ /1/2/8/0/ /// /ر/و/ت/ر/ /6/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/3/8/m/s/×/1/ |
| /procurement/dashboard | 3001 ms | 1757 ms | /د/س/ت/ر/س/ی/ /1/1/1/4/ /// /ر/و/ت/ر/ /6/4/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/2/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/7/m/s/×/1/ |
| /procurement/workspace | 4626 ms | 2926 ms | /د/س/ت/ر/س/ی/ /1/9/7/8/ /// /ر/و/ت/ر/ /9/4/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/4/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/8/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/0/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
