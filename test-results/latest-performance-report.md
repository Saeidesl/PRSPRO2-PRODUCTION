# PMS UI and Performance Audit

- Generated: 2026-11-08T17:12:37.841Z
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
| visibleButtonsInventoried | 145 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 341 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 4938 | 7598 | 0 | 4 | 2 | no |
| projects | loaded | 3893 | 6550 | 0 | 1 | 2 | no |
| project-detail | loaded | 3892 | 6549 | 0 | 2 | 0 | no |
| print-design | loaded | 3885 | 6544 | 1 | 15 | 6 | no |
| print-output | loaded | 3898 | 6555 | 0 | 2 | 6 | no |
| events | loaded | 4397 | 7055 | 0 | 7 | 2 | no |
| workflows | loaded | 3904 | 6562 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3382 | 6039 | 0 | 1 | 1 | no |
| event-types | loaded | 3881 | 6543 | 0 | 58 | 1 | no |
| information-types | loaded | 3905 | 6563 | 0 | 1 | 1 | no |
| procurement | loaded | 5395 | 29446 | 0 | 9 | 0 | no |
| attachments | loaded | 4389 | 7046 | 0 | 1 | 2 | no |
| reports | loaded | 3375 | 6035 | 0 | 8 | 12 | no |
| users | loaded | 3382 | 6039 | 0 | 1 | 1 | no |
| departments | loaded | 4405 | 7059 | 0 | 8 | 1 | no |
| roles | loaded | 2878 | 5533 | 0 | 21 | 1 | no |
| permissions | loaded | 3877 | 6534 | 0 | 0 | 1 | no |
| audit | loaded | 6888 | 9544 | 0 | 1 | 1 | no |
| settings | loaded | 3884 | 6541 | 0 | 1 | 3 | no |
| admin | loaded | 3381 | 6037 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T17:15:23.829Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4725 ms | 3081 ms | /د/س/ت/ر/س/ی/ /1/9/1/7/ /// /ر/و/ت/ر/ /1/1/6/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/8/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/5/5/m/s/×/2/ |
| /procurement/orders | 4266 ms | 2344 ms | /د/س/ت/ر/س/ی/ /1/6/3/8/ /// /ر/و/ت/ر/ /7/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/0/m/s/×/1/ |
| /procurement/needs | 4515 ms | 2676 ms | /د/س/ت/ر/س/ی/ /1/6/3/6/ /// /ر/و/ت/ر/ /1/0/3/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/8/m/s/×/1/ |
| /procurement/dashboard | 4338 ms | 2341 ms | /د/س/ت/ر/س/ی/ /1/5/8/7/ /// /ر/و/ت/ر/ /7/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/4/m/s/×/1/ |
| /procurement/workspace | 3246 ms | 2166 ms | /د/س/ت/ر/س/ی/ /1/3/9/4/ /// /ر/و/ت/ر/ /7/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
