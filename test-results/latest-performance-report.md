# PMS UI and Performance Audit

- Generated: 2026-11-18T10:33:23.277Z
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
| visibleButtonsInventoried | 614 |
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
| dashboard | loaded | 4460 | 7119 | 0 | 4 | 2 | no |
| projects | loaded | 2901 | 5559 | 0 | 1 | 2 | no |
| project-detail | loaded | 4898 | 7554 | 0 | 2 | 0 | no |
| print-design | loaded | 4392 | 7050 | 1 | 17 | 7 | no |
| print-output | loaded | 3402 | 6059 | 0 | 2 | 6 | no |
| events | loaded | 4391 | 7049 | 0 | 5 | 2 | no |
| workflows | loaded | 3912 | 6570 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3891 | 6548 | 0 | 1 | 1 | no |
| event-types | loaded | 3378 | 6041 | 0 | 85 | 1 | no |
| information-types | loaded | 3894 | 6551 | 0 | 1 | 1 | no |
| procurement | loaded | 3884 | 29496 | 0 | 9 | 0 | no |
| attachments | loaded | 4391 | 7048 | 0 | 1 | 1 | no |
| reports | loaded | 4887 | 7548 | 0 | 8 | 12 | no |
| users | loaded | 3900 | 6556 | 0 | 1 | 1 | no |
| departments | loaded | 4887 | 7545 | 0 | 8 | 1 | no |
| roles | loaded | 4381 | 7038 | 0 | 21 | 1 | no |
| permissions | loaded | 4385 | 7042 | 0 | 0 | 1 | no |
| audit | loaded | 3889 | 6546 | 0 | 1 | 1 | no |
| settings | loaded | 3887 | 6545 | 0 | 1 | 3 | no |
| admin | loaded | 4386 | 7075 | 0 | 445 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-18T10:36:04.709Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 7270 ms | 5783 ms | /د/س/ت/ر/س/ی/ /3/7/2/4/ /// /ر/و/ت/ر/ /2/0/5/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/4/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/1/0/4/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/4/4/m/s/×/1/ |
| /procurement/orders | 3610 ms | 2142 ms | /د/س/ت/ر/س/ی/ /1/3/7/0/ /// /ر/و/ت/ر/ /7/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/8/2/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/2/8/0/m/s/×/1/ |
| /procurement/needs | 3369 ms | 1932 ms | /د/س/ت/ر/س/ی/ /1/5/0/3/ /// /ر/و/ت/ر/ /4/2/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/7/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/7/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/3/m/s/×/1/ |
| /procurement/dashboard | 3574 ms | 1925 ms | /د/س/ت/ر/س/ی/ /1/4/8/0/ /// /ر/و/ت/ر/ /4/4/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/6/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/6/3/m/s/×/1/ |
| /procurement/workspace | 3321 ms | 1963 ms | /د/س/ت/ر/س/ی/ /1/3/8/6/ /// /ر/و/ت/ر/ /5/7/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/2/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
