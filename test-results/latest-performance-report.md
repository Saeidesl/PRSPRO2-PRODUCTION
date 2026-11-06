# PMS UI and Performance Audit

- Generated: 2026-11-06T20:36:53.829Z
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
| visibleButtonsInventoried | 178 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 318 |
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
| dashboard | loaded | 3934 | 6593 | 0 | 4 | 2 | no |
| projects | loaded | 3889 | 6546 | 0 | 1 | 2 | no |
| project-detail | loaded | 3893 | 6549 | 0 | 2 | 0 | no |
| print-design | loaded | 3882 | 6540 | 1 | 14 | 5 | no |
| print-output | loaded | 3384 | 6041 | 0 | 1 | 2 | no |
| events | loaded | 2401 | 5056 | 0 | 7 | 2 | no |
| workflows | loaded | 3400 | 6055 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3880 | 6535 | 0 | 9 | 1 | no |
| event-types | loaded | 2880 | 5543 | 0 | 58 | 1 | no |
| information-types | loaded | 3383 | 6041 | 0 | 1 | 1 | no |
| procurement | loaded | 3881 | 30978 | 0 | 9 | 0 | no |
| attachments | loaded | 2877 | 5534 | 0 | 1 | 2 | no |
| reports | loaded | 2881 | 5541 | 0 | 8 | 12 | no |
| users | loaded | 3382 | 6037 | 0 | 1 | 1 | no |
| departments | loaded | 3379 | 6037 | 0 | 8 | 1 | no |
| roles | loaded | 3412 | 6069 | 0 | 21 | 1 | no |
| permissions | loaded | 3375 | 6032 | 0 | 0 | 1 | no |
| audit | loaded | 5390 | 8045 | 0 | 1 | 1 | no |
| settings | loaded | 4420 | 7078 | 0 | 1 | 3 | no |
| admin | loaded | 6403 | 9062 | 0 | 30 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-06T20:39:33.494Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4369 ms | 2789 ms | /د/س/ت/ر/س/ی/ /1/4/6/5/ /// /ر/و/ت/ر/ /1/3/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/8/m/s/×/1/ |
| /procurement/orders | 5134 ms | 3382 ms | /د/س/ت/ر/س/ی/ /2/6/6/9/ /// /ر/و/ت/ر/ /7/1/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/2/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/1/8/m/s/×/1/,/ /g/e/t/A/l/l/:/6/9/9/m/s/×/1/ |
| /procurement/needs | 3898 ms | 2836 ms | /د/س/ت/ر/س/ی/ /2/0/3/8/ /// /ر/و/ت/ر/ /7/9/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/0/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/4/m/s/×/1/ |
| /procurement/dashboard | 4532 ms | 2825 ms | /د/س/ت/ر/س/ی/ /1/7/8/0/ /// /ر/و/ت/ر/ /1/0/4/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/0/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/1/3/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/1/0/m/s/×/1/ |
| /procurement/workspace | 4178 ms | 2472 ms | /د/س/ت/ر/س/ی/ /1/7/6/6/ /// /ر/و/ت/ر/ /7/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
