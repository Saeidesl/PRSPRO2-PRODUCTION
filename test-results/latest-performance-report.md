# PMS UI and Performance Audit

- Generated: 2026-11-07T17:44:51.791Z
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
| visibleButtonsInventoried | 143 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 327 |
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
| dashboard | loaded | 3983 | 6645 | 0 | 4 | 2 | no |
| projects | loaded | 2921 | 5580 | 0 | 1 | 2 | no |
| project-detail | loaded | 3936 | 6593 | 0 | 2 | 0 | no |
| print-design | loaded | 2915 | 5576 | 1 | 14 | 5 | no |
| print-output | loaded | 4438 | 7097 | 0 | 1 | 2 | no |
| events | loaded | 4471 | 7130 | 0 | 7 | 2 | no |
| workflows | loaded | 3425 | 6080 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2932 | 5591 | 0 | 1 | 1 | no |
| event-types | loaded | 3436 | 6098 | 0 | 58 | 1 | no |
| information-types | loaded | 2910 | 5566 | 0 | 1 | 1 | no |
| procurement | loaded | 3436 | 27728 | 0 | 9 | 0 | no |
| attachments | loaded | 4921 | 7578 | 0 | 1 | 2 | no |
| reports | loaded | 4930 | 7596 | 0 | 8 | 12 | no |
| users | loaded | 3407 | 6066 | 0 | 1 | 1 | no |
| departments | loaded | 3910 | 6567 | 0 | 8 | 1 | no |
| roles | loaded | 3432 | 6091 | 0 | 21 | 1 | no |
| permissions | loaded | 3423 | 6080 | 0 | 0 | 1 | no |
| audit | loaded | 4410 | 7068 | 0 | 1 | 1 | no |
| settings | loaded | 3406 | 6063 | 0 | 1 | 3 | no |
| admin | loaded | 5449 | 8108 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T17:47:21.354Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5867 ms | 4153 ms | /د/س/ت/ر/س/ی/ /2/3/9/0/ /// /ر/و/ت/ر/ /1/7/6/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/5/1/0/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/2/6/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/2/6/3/m/s/×/1/ |
| /procurement/orders | 3492 ms | 2263 ms | /د/س/ت/ر/س/ی/ /1/5/5/6/ /// /ر/و/ت/ر/ /7/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/8/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/9/m/s/×/1/ |
| /procurement/needs | 3182 ms | 1360 ms | /د/س/ت/ر/س/ی/ /9/8/4/ /// /ر/و/ت/ر/ /3/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/7/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/2/5/9/m/s/×/1/ |
| /procurement/dashboard | 3358 ms | 1824 ms | /د/س/ت/ر/س/ی/ /1/4/9/4/ /// /ر/و/ت/ر/ /3/2/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/2/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/8/m/s/×/1/ |
| /procurement/workspace | 4406 ms | 2929 ms | /د/س/ت/ر/س/ی/ /1/6/2/7/ /// /ر/و/ت/ر/ /1/3/0/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/1/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/9/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
