# PMS UI and Performance Audit

- Generated: 2026-11-07T19:53:03.863Z
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
| visibleButtonsInventoried | 217 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 346 |
| procurementApiRequestsMeasured | 10 |
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
| dashboard | loaded | 3480 | 6141 | 0 | 4 | 2 | no |
| projects | loaded | 3924 | 6581 | 0 | 1 | 2 | no |
| project-detail | loaded | 5449 | 8108 | 0 | 2 | 0 | no |
| print-design | loaded | 3416 | 6076 | 1 | 14 | 5 | no |
| print-output | loaded | 3911 | 6566 | 0 | 1 | 2 | no |
| events | loaded | 3922 | 6580 | 0 | 7 | 2 | no |
| workflows | loaded | 3948 | 6608 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3411 | 6067 | 0 | 9 | 1 | no |
| event-types | loaded | 3909 | 6574 | 0 | 58 | 1 | no |
| information-types | loaded | 3413 | 6070 | 0 | 1 | 1 | no |
| procurement | loaded | 3942 | 23996 | 0 | 9 | 0 | no |
| attachments | loaded | 2940 | 5595 | 0 | 1 | 2 | no |
| reports | loaded | 2966 | 5625 | 0 | 8 | 12 | no |
| users | loaded | 3410 | 6066 | 0 | 1 | 1 | no |
| departments | loaded | 3402 | 6058 | 0 | 8 | 1 | no |
| roles | loaded | 3908 | 6566 | 0 | 1 | 1 | no |
| permissions | loaded | 3903 | 6560 | 0 | 0 | 1 | no |
| audit | loaded | 2424 | 5083 | 0 | 1 | 1 | no |
| settings | loaded | 3413 | 6071 | 0 | 1 | 3 | no |
| admin | loaded | 3914 | 6579 | 0 | 89 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T19:55:33.848Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3431 ms | 2176 ms | /د/س/ت/ر/س/ی/ /1/2/6/3/ /// /ر/و/ت/ر/ /9/1/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/4/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/7/0/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/6/8/m/s/×/1/ |
| /procurement/orders | 2966 ms | 1615 ms | /د/س/ت/ر/س/ی/ /1/1/5/2/ /// /ر/و/ت/ر/ /4/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/1/m/s/×/1/ |
| /procurement/needs | 4590 ms | 2784 ms | /د/س/ت/ر/س/ی/ /1/8/8/0/ /// /ر/و/ت/ر/ /9/0/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/9/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/6/m/s/×/1/ |
| /procurement/dashboard | 3769 ms | 2439 ms | /د/س/ت/ر/س/ی/ /1/6/0/1/ /// /ر/و/ت/ر/ /8/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/9/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/4/8/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/3/4/m/s/×/1/ |
| /procurement/workspace | 2602 ms | 1576 ms | /د/س/ت/ر/س/ی/ /1/0/0/3/ /// /ر/و/ت/ر/ /5/7/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/3/3/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/2/3/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
