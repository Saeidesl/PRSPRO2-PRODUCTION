# PMS UI and Performance Audit

- Generated: 2026-11-25T19:11:45.949Z
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
| visibleButtonsInventoried | 337 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 384 |
| procurementApiRequestsMeasured | 8 |
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
| dashboard | loaded | 2432 | 5092 | 0 | 4 | 2 | no |
| projects | loaded | 4394 | 7049 | 0 | 1 | 2 | no |
| project-detail | loaded | 2886 | 5544 | 0 | 2 | 0 | no |
| print-design | loaded | 3384 | 6044 | 1 | 17 | 7 | no |
| print-output | loaded | 2896 | 5550 | 0 | 2 | 6 | no |
| events | loaded | 3386 | 6043 | 0 | 5 | 2 | no |
| workflows | loaded | 4906 | 7565 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2879 | 5537 | 0 | 1 | 1 | no |
| event-types | loaded | 3372 | 6033 | 0 | 85 | 1 | no |
| information-types | loaded | 2392 | 5061 | 0 | 142 | 1 | no |
| procurement | loaded | 4381 | 25180 | 0 | 9 | 0 | no |
| attachments | loaded | 2880 | 5537 | 0 | 1 | 1 | no |
| reports | loaded | 2871 | 5529 | 0 | 8 | 12 | no |
| users | loaded | 3900 | 6557 | 0 | 25 | 1 | no |
| departments | loaded | 3879 | 6537 | 0 | 8 | 1 | no |
| roles | loaded | 3375 | 6032 | 0 | 21 | 1 | no |
| permissions | loaded | 3876 | 6530 | 0 | 0 | 1 | no |
| audit | loaded | 3896 | 6554 | 0 | 1 | 1 | no |
| settings | loaded | 4886 | 7542 | 0 | 1 | 3 | no |
| admin | loaded | 2879 | 5533 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T19:14:11.440Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3691 ms | 2372 ms | /د/س/ت/ر/س/ی/ /1/6/9/8/ /// /ر/و/ت/ر/ /6/7/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/5/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/8/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/6/m/s/×/1/ |
| /procurement/orders | 2661 ms | 1390 ms | /د/س/ت/ر/س/ی/ /9/9/0/ /// /ر/و/ت/ر/ /4/0/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/0/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/7/m/s/×/1/ |
| /procurement/needs | 2198 ms | 931 ms | /د/س/ت/ر/س/ی/ /6/2/1/ /// /ر/و/ت/ر/ /3/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/1/2/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/2/3/m/s/×/1/ |
| /procurement/dashboard | 4687 ms | 3108 ms | /د/س/ت/ر/س/ی/ /2/2/5/6/ /// /ر/و/ت/ر/ /8/5/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/7/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/5/m/s/×/1/ |
| /procurement/workspace | 4085 ms | 2275 ms | /د/س/ت/ر/س/ی/ /1/8/6/2/ /// /ر/و/ت/ر/ /4/1/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/0/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/4/4/m/s/×/1/,/ /g/e/t/A/l/l/:/5/1/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
