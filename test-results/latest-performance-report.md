# PMS UI and Performance Audit

- Generated: 2026-11-10T19:51:46.166Z
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
| visibleButtonsInventoried | 389 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 345 |
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
| dashboard | loaded | 3551 | 6211 | 0 | 4 | 2 | no |
| projects | loaded | 5436 | 8094 | 0 | 1 | 2 | no |
| project-detail | loaded | 3423 | 6080 | 0 | 2 | 0 | no |
| print-design | loaded | 3429 | 6091 | 1 | 17 | 7 | no |
| print-output | loaded | 3920 | 6578 | 0 | 2 | 6 | no |
| events | loaded | 2973 | 5630 | 0 | 7 | 2 | no |
| workflows | loaded | 3939 | 6597 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2413 | 5071 | 0 | 1 | 1 | no |
| event-types | loaded | 4922 | 7588 | 0 | 85 | 1 | no |
| information-types | loaded | 5423 | 8082 | 0 | 1 | 1 | no |
| procurement | loaded | 3433 | 31400 | 0 | 9 | 0 | no |
| attachments | loaded | 4421 | 7079 | 0 | 1 | 2 | no |
| reports | loaded | 3933 | 6594 | 0 | 8 | 12 | no |
| users | loaded | 2903 | 5561 | 0 | 1 | 1 | no |
| departments | loaded | 3914 | 6574 | 0 | 8 | 1 | no |
| roles | loaded | 3915 | 6569 | 0 | 1 | 1 | no |
| permissions | loaded | 4949 | 7605 | 0 | 0 | 1 | no |
| audit | loaded | 3409 | 6068 | 0 | 1 | 1 | no |
| settings | loaded | 3422 | 6081 | 0 | 1 | 3 | no |
| admin | loaded | 4451 | 7228 | 0 | 238 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T19:54:28.475Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5614 ms | 4040 ms | /د/س/ت/ر/س/ی/ /1/8/7/0/ /// /ر/و/ت/ر/ /2/1/7/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/9/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/7/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/9/m/s/×/1/ |
| /procurement/orders | 4993 ms | 2752 ms | /د/س/ت/ر/س/ی/ /2/3/0/7/ /// /ر/و/ت/ر/ /4/4/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/6/1/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/8/4/m/s/×/1/ |
| /procurement/needs | 4213 ms | 2268 ms | /د/س/ت/ر/س/ی/ /1/1/7/4/ /// /ر/و/ت/ر/ /1/0/9/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/6/m/s/×/1/ |
| /procurement/dashboard | 3846 ms | 2031 ms | /د/س/ت/ر/س/ی/ /1/0/5/9/ /// /ر/و/ت/ر/ /9/7/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/9/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/5/5/m/s/×/2/ |
| /procurement/workspace | 4823 ms | 3129 ms | /د/س/ت/ر/س/ی/ /2/2/0/2/ /// /ر/و/ت/ر/ /9/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/6/6/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
