# PMS UI and Performance Audit

- Generated: 2026-11-08T09:46:17.693Z
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
| visibleFormsInventoried | 13 |
| dynamicFormsInventoried | 12 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 283 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 341 |
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
| dashboard | loaded | 2984 | 5643 | 0 | 4 | 2 | no |
| projects | loaded | 2972 | 5629 | 0 | 1 | 2 | no |
| project-detail | loaded | 2920 | 5578 | 0 | 2 | 0 | no |
| print-design | loaded | 3417 | 6077 | 1 | 14 | 5 | no |
| print-output | loaded | 3426 | 6082 | 0 | 1 | 2 | no |
| events | loaded | 2938 | 5596 | 0 | 7 | 2 | no |
| workflows | loaded | 3447 | 6103 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3416 | 6071 | 0 | 9 | 1 | no |
| event-types | loaded | 2911 | 5573 | 0 | 58 | 1 | no |
| information-types | loaded | 3414 | 6069 | 0 | 1 | 1 | no |
| procurement | loaded | 3432 | 26545 | 0 | 9 | 0 | no |
| attachments | loaded | 4414 | 7074 | 0 | 37 | 2 | no |
| reports | loaded | 2406 | 5065 | 0 | 8 | 12 | no |
| users | loaded | 2905 | 5563 | 0 | 1 | 1 | no |
| departments | loaded | 2955 | 5611 | 0 | 8 | 1 | no |
| roles | loaded | 4914 | 7572 | 0 | 21 | 1 | no |
| permissions | loaded | 3417 | 6073 | 0 | 0 | 1 | no |
| audit | loaded | 3947 | 6603 | 0 | 1 | 1 | no |
| settings | loaded | 3913 | 6568 | 0 | 1 | 3 | no |
| admin | loaded | 3410 | 6077 | 0 | 99 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T09:48:45.621Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3871 ms | 2225 ms | /د/س/ت/ر/س/ی/ /1/2/3/0/ /// /ر/و/ت/ر/ /9/9/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/7/m/s/×/1/ |
| /procurement/orders | 3715 ms | 2373 ms | /د/س/ت/ر/س/ی/ /1/7/7/7/ /// /ر/و/ت/ر/ /5/9/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/0/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/1/m/s/×/1/ |
| /procurement/needs | 3292 ms | 1990 ms | /د/س/ت/ر/س/ی/ /1/0/3/8/ /// /ر/و/ت/ر/ /9/5/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/4/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/6/m/s/×/1/ |
| /procurement/dashboard | 2841 ms | 1783 ms | /د/س/ت/ر/س/ی/ /1/1/9/2/ /// /ر/و/ت/ر/ /5/9/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/7/m/s/×/1/ |
| /procurement/workspace | 3905 ms | 2083 ms | /د/س/ت/ر/س/ی/ /1/3/5/6/ /// /ر/و/ت/ر/ /7/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
