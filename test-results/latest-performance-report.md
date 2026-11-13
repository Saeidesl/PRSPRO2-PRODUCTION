# PMS UI and Performance Audit

- Generated: 2026-11-13T17:41:19.154Z
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
| visibleButtonsInventoried | 180 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 333 |
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
| dashboard | loaded | 3471 | 6132 | 0 | 4 | 2 | no |
| projects | loaded | 2916 | 5574 | 0 | 1 | 2 | no |
| project-detail | loaded | 3438 | 6096 | 0 | 2 | 0 | no |
| print-design | loaded | 4923 | 7585 | 1 | 17 | 7 | no |
| print-output | loaded | 4929 | 7587 | 0 | 2 | 6 | no |
| events | loaded | 2964 | 5623 | 0 | 5 | 2 | no |
| workflows | loaded | 3425 | 6081 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4424 | 7081 | 0 | 9 | 1 | no |
| event-types | loaded | 3933 | 6599 | 0 | 85 | 1 | no |
| information-types | loaded | 4411 | 7069 | 0 | 1 | 1 | no |
| procurement | loaded | 4911 | 31045 | 0 | 9 | 0 | no |
| attachments | loaded | 3414 | 6071 | 0 | 1 | 1 | no |
| reports | loaded | 2924 | 5588 | 0 | 8 | 12 | no |
| users | loaded | 4413 | 7070 | 0 | 1 | 1 | no |
| departments | loaded | 3431 | 6090 | 0 | 8 | 1 | no |
| roles | loaded | 4910 | 7568 | 0 | 21 | 1 | no |
| permissions | loaded | 3941 | 6596 | 0 | 0 | 1 | no |
| audit | loaded | 3925 | 6582 | 0 | 1 | 1 | no |
| settings | loaded | 3422 | 6080 | 0 | 1 | 3 | no |
| admin | loaded | 3917 | 6575 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-13T17:44:02.014Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4835 ms | 3116 ms | /د/س/ت/ر/س/ی/ /1/2/6/6/ /// /ر/و/ت/ر/ /1/8/5/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/4/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/2/m/s/×/1/ |
| /procurement/orders | 5232 ms | 1893 ms | /د/س/ت/ر/س/ی/ /1/2/4/1/ /// /ر/و/ت/ر/ /6/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/6/m/s/×/1/ |
| /procurement/needs | 4536 ms | 3214 ms | /د/س/ت/ر/س/ی/ /1/4/7/1/ /// /ر/و/ت/ر/ /1/7/4/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/4/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/3/m/s/×/1/ |
| /procurement/dashboard | 3773 ms | 1733 ms | /د/س/ت/ر/س/ی/ /1/2/1/7/ /// /ر/و/ت/ر/ /5/1/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/0/m/s/×/1/ |
| /procurement/workspace | 3752 ms | 2027 ms | /د/س/ت/ر/س/ی/ /1/4/3/8/ /// /ر/و/ت/ر/ /5/8/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/0/2/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/9/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
