# PMS UI and Performance Audit

- Generated: 2026-11-16T19:23:32.192Z
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
| visibleButtonsInventoried | 152 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 338 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 4937 | 7594 | 0 | 4 | 2 | no |
| projects | loaded | 4400 | 7057 | 0 | 1 | 2 | no |
| project-detail | loaded | 5398 | 8056 | 0 | 2 | 0 | no |
| print-design | loaded | 3887 | 6544 | 1 | 17 | 7 | no |
| print-output | loaded | 3888 | 6544 | 0 | 2 | 6 | no |
| events | loaded | 4392 | 7049 | 0 | 5 | 2 | no |
| workflows | loaded | 3402 | 6059 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3386 | 6043 | 0 | 1 | 1 | no |
| event-types | loaded | 3882 | 6548 | 0 | 85 | 1 | no |
| information-types | loaded | 4380 | 7037 | 0 | 1 | 1 | no |
| procurement | loaded | 4384 | 29546 | 0 | 9 | 0 | no |
| attachments | loaded | 5398 | 8053 | 0 | 1 | 1 | no |
| reports | loaded | 5387 | 8047 | 0 | 8 | 12 | no |
| users | loaded | 3385 | 6042 | 0 | 1 | 1 | no |
| departments | loaded | 4885 | 7544 | 0 | 8 | 1 | no |
| roles | loaded | 4894 | 7551 | 0 | 1 | 1 | no |
| permissions | loaded | 3377 | 6033 | 0 | 0 | 1 | no |
| audit | loaded | 3906 | 6564 | 0 | 1 | 1 | no |
| settings | loaded | 2883 | 5540 | 0 | 1 | 3 | no |
| admin | loaded | 3903 | 6561 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-16T19:26:18.305Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4703 ms | 3146 ms | /د/س/ت/ر/س/ی/ /1/7/2/2/ /// /ر/و/ت/ر/ /1/4/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/0/7/m/s/×/2/ |
| /procurement/orders | 4768 ms | 3117 ms | /د/س/ت/ر/س/ی/ /1/5/6/6/ /// /ر/و/ت/ر/ /1/5/5/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/5/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/5/m/s/×/1/ |
| /procurement/needs | 3982 ms | 2182 ms | /د/س/ت/ر/س/ی/ /1/4/3/2/ /// /ر/و/ت/ر/ /7/5/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/9/m/s/×/1/ |
| /procurement/dashboard | 4094 ms | 2417 ms | /د/س/ت/ر/س/ی/ /1/4/1/6/ /// /ر/و/ت/ر/ /1/0/0/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/0/m/s/×/1/ |
| /procurement/workspace | 3639 ms | 2399 ms | /د/س/ت/ر/س/ی/ /1/7/9/2/ /// /ر/و/ت/ر/ /6/0/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/9/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/6/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
