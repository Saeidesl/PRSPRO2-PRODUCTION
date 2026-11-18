# PMS UI and Performance Audit

- Generated: 2026-11-18T07:54:45.371Z
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
| visibleButtonsInventoried | 321 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 332 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 3494 | 6155 | 0 | 4 | 2 | no |
| projects | loaded | 3931 | 6589 | 0 | 1 | 2 | no |
| project-detail | loaded | 5432 | 8090 | 0 | 2 | 0 | no |
| print-design | loaded | 3918 | 6579 | 1 | 17 | 7 | no |
| print-output | loaded | 3416 | 6070 | 0 | 2 | 6 | no |
| events | loaded | 3933 | 6591 | 0 | 5 | 2 | no |
| workflows | loaded | 2445 | 5103 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2409 | 5066 | 0 | 9 | 1 | no |
| event-types | loaded | 3915 | 6581 | 0 | 85 | 1 | no |
| information-types | loaded | 3933 | 6601 | 0 | 136 | 1 | no |
| procurement | loaded | 3414 | 27845 | 0 | 9 | 0 | no |
| attachments | loaded | 4424 | 7082 | 0 | 1 | 1 | no |
| reports | loaded | 3909 | 6572 | 0 | 8 | 12 | no |
| users | loaded | 4420 | 7078 | 0 | 27 | 1 | no |
| departments | loaded | 3912 | 6570 | 0 | 8 | 1 | no |
| roles | loaded | 6434 | 9090 | 0 | 1 | 1 | no |
| permissions | loaded | 3419 | 6078 | 0 | 0 | 1 | no |
| audit | loaded | 3919 | 6576 | 0 | 1 | 1 | no |
| settings | loaded | 6936 | 9592 | 0 | 1 | 3 | no |
| admin | loaded | 3916 | 6574 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-18T07:57:25.235Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3617 ms | 2402 ms | /د/س/ت/ر/س/ی/ /1/4/0/9/ /// /ر/و/ت/ر/ /9/9/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/4/m/s/×/1/ |
| /procurement/orders | 2847 ms | 1225 ms | /د/س/ت/ر/س/ی/ /8/3/2/ /// /ر/و/ت/ر/ /3/9/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/0/3/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/7/2/m/s/×/1/ |
| /procurement/needs | 3511 ms | 1419 ms | /د/س/ت/ر/س/ی/ /9/9/5/ /// /ر/و/ت/ر/ /4/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/1/m/s/×/1/ |
| /procurement/dashboard | 4052 ms | 1905 ms | /د/س/ت/ر/س/ی/ /1/3/9/2/ /// /ر/و/ت/ر/ /5/1/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/8/6/m/s/×/2/ |
| /procurement/workspace | 6412 ms | 4747 ms | /د/س/ت/ر/س/ی/ /3/0/6/5/ /// /ر/و/ت/ر/ /1/6/8/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/9/1/m/s/×/1/,/ /g/e/t/A/l/l/:/9/3/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/0/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
