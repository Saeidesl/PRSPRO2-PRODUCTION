# PMS UI and Performance Audit

- Generated: 2026-11-25T08:47:49.989Z
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
| visibleButtonsInventoried | 114 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 339 |
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
| dashboard | loaded | 5990 | 8649 | 0 | 4 | 2 | no |
| projects | loaded | 4938 | 7593 | 0 | 1 | 2 | no |
| project-detail | loaded | 4926 | 7585 | 0 | 2 | 0 | no |
| print-design | loaded | 4926 | 7587 | 1 | 17 | 7 | no |
| print-output | loaded | 3417 | 6073 | 0 | 2 | 6 | no |
| events | loaded | 3443 | 6100 | 0 | 5 | 2 | no |
| workflows | loaded | 4452 | 7110 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4925 | 7582 | 0 | 1 | 1 | no |
| event-types | loaded | 3912 | 6570 | 0 | 1 | 1 | no |
| information-types | loaded | 6939 | 9595 | 0 | 1 | 1 | no |
| procurement | loaded | 3913 | 41263 | 0 | 9 | 0 | no |
| attachments | loaded | 7940 | 10597 | 0 | 1 | 1 | no |
| reports | loaded | 4917 | 7579 | 0 | 8 | 12 | no |
| users | loaded | 3936 | 6594 | 0 | 27 | 1 | no |
| departments | loaded | 3935 | 6594 | 0 | 8 | 1 | no |
| roles | loaded | 6000 | 8658 | 0 | 21 | 1 | no |
| permissions | loaded | 3410 | 6067 | 0 | 0 | 1 | no |
| audit | loaded | 3915 | 6573 | 0 | 1 | 1 | no |
| settings | loaded | 4415 | 7070 | 0 | 1 | 3 | no |
| admin | loaded | 5925 | 8581 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T08:51:04.436Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 8812 ms | 7109 ms | /د/س/ت/ر/س/ی/ /3/3/8/9/ /// /ر/و/ت/ر/ /3/7/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/9/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/7/9/6/m/s/×/1/ |
| /procurement/orders | 5030 ms | 3685 ms | /د/س/ت/ر/س/ی/ /2/6/2/4/ /// /ر/و/ت/ر/ /1/0/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/6/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/3/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/0/0/m/s/×/1/ |
| /procurement/needs | 7390 ms | 5571 ms | /د/س/ت/ر/س/ی/ /4/3/9/5/ /// /ر/و/ت/ر/ /1/1/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/6/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/1/2/0/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/2/9/m/s/×/1/ |
| /procurement/dashboard | 6174 ms | 3580 ms | /د/س/ت/ر/س/ی/ /2/6/2/3/ /// /ر/و/ت/ر/ /9/5/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/2/5/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/2/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/9/8/m/s/×/1/ |
| /procurement/workspace | 5462 ms | 3691 ms | /د/س/ت/ر/س/ی/ /2/7/6/9/ /// /ر/و/ت/ر/ /9/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/2/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/1/3/m/s/×/1/,/ /g/e/t/A/l/l/:/6/1/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
