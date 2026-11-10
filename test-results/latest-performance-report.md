# PMS UI and Performance Audit

- Generated: 2026-11-10T12:38:58.572Z
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
| visibleButtonsInventoried | 180 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 366 |
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
| dashboard | loaded | 3434 | 6095 | 0 | 4 | 2 | no |
| projects | loaded | 3423 | 6077 | 0 | 1 | 2 | no |
| project-detail | loaded | 3925 | 6583 | 0 | 2 | 0 | no |
| print-design | loaded | 4918 | 7576 | 1 | 17 | 7 | no |
| print-output | loaded | 3414 | 6070 | 0 | 2 | 6 | no |
| events | loaded | 4420 | 7079 | 0 | 7 | 2 | no |
| workflows | loaded | 3423 | 6080 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4946 | 7603 | 0 | 1 | 1 | no |
| event-types | loaded | 2926 | 5590 | 0 | 85 | 1 | no |
| information-types | loaded | 3916 | 6575 | 0 | 1 | 1 | no |
| procurement | loaded | 7424 | 28162 | 0 | 9 | 0 | no |
| attachments | loaded | 4445 | 7103 | 0 | 1 | 2 | no |
| reports | loaded | 3431 | 6092 | 0 | 8 | 12 | no |
| users | loaded | 2903 | 5561 | 0 | 27 | 1 | no |
| departments | loaded | 3909 | 6566 | 0 | 8 | 1 | no |
| roles | loaded | 2927 | 5585 | 0 | 1 | 1 | no |
| permissions | loaded | 2928 | 5585 | 0 | 0 | 1 | no |
| audit | loaded | 4425 | 7084 | 0 | 1 | 1 | no |
| settings | loaded | 3412 | 6069 | 0 | 1 | 3 | no |
| admin | loaded | 3926 | 6582 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T12:41:35.333Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3931 ms | 2130 ms | /د/س/ت/ر/س/ی/ /1/1/3/8/ /// /ر/و/ت/ر/ /9/9/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/3/m/s/×/1/ |
| /procurement/orders | 2999 ms | 1568 ms | /د/س/ت/ر/س/ی/ /1/1/2/0/ /// /ر/و/ت/ر/ /4/4/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/3/m/s/×/1/ |
| /procurement/needs | 2504 ms | 1523 ms | /د/س/ت/ر/س/ی/ /1/0/6/7/ /// /ر/و/ت/ر/ /4/5/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/0/m/s/×/1/ |
| /procurement/dashboard | 2859 ms | 1725 ms | /د/س/ت/ر/س/ی/ /1/1/4/5/ /// /ر/و/ت/ر/ /5/8/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/4/m/s/×/1/ |
| /procurement/workspace | 3462 ms | 1750 ms | /د/س/ت/ر/س/ی/ /1/3/8/0/ /// /ر/و/ت/ر/ /3/7/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
