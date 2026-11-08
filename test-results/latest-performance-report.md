# PMS UI and Performance Audit

- Generated: 2026-11-08T11:51:45.545Z
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
| visibleButtonsInventoried | 157 |
| visibleInputsAndControlsInventoried | 43 |
| networkRequestsMeasured | 351 |
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
| dashboard | loaded | 3478 | 6139 | 0 | 4 | 2 | no |
| projects | loaded | 3933 | 6591 | 0 | 1 | 2 | no |
| project-detail | loaded | 4436 | 7094 | 0 | 2 | 0 | no |
| print-design | loaded | 3917 | 6578 | 1 | 14 | 6 | no |
| print-output | loaded | 3426 | 6082 | 0 | 1 | 2 | no |
| events | loaded | 2925 | 5582 | 0 | 7 | 2 | no |
| workflows | loaded | 3969 | 6626 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3924 | 6581 | 0 | 9 | 1 | no |
| event-types | loaded | 3912 | 6574 | 0 | 58 | 1 | no |
| information-types | loaded | 3918 | 6574 | 0 | 1 | 1 | no |
| procurement | loaded | 3918 | 29361 | 0 | 9 | 0 | no |
| attachments | loaded | 4421 | 7079 | 0 | 1 | 2 | no |
| reports | loaded | 2903 | 5565 | 0 | 8 | 12 | no |
| users | loaded | 4442 | 7102 | 0 | 27 | 1 | no |
| departments | loaded | 4924 | 7583 | 0 | 8 | 1 | no |
| roles | loaded | 3905 | 6561 | 0 | 1 | 1 | no |
| permissions | loaded | 4907 | 7564 | 0 | 0 | 1 | no |
| audit | loaded | 3908 | 6565 | 0 | 1 | 1 | no |
| settings | loaded | 3913 | 6570 | 0 | 1 | 3 | no |
| admin | loaded | 3915 | 6570 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T11:54:24.987Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4676 ms | 3153 ms | /د/س/ت/ر/س/ی/ /1/5/8/6/ /// /ر/و/ت/ر/ /1/5/6/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/8/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/3/m/s/×/1/ |
| /procurement/orders | 4591 ms | 2550 ms | /د/س/ت/ر/س/ی/ /1/8/5/5/ /// /ر/و/ت/ر/ /6/9/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/5/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/7/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/7/m/s/×/1/ |
| /procurement/needs | 5360 ms | 3557 ms | /د/س/ت/ر/س/ی/ /2/5/1/5/ /// /ر/و/ت/ر/ /1/0/4/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/2/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/6/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/3/6/m/s/×/1/ |
| /procurement/dashboard | 3813 ms | 2573 ms | /د/س/ت/ر/س/ی/ /1/8/9/2/ /// /ر/و/ت/ر/ /6/8/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/7/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/9/3/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/9/2/m/s/×/1/ |
| /procurement/workspace | 3005 ms | 2002 ms | /د/س/ت/ر/س/ی/ /1/3/4/3/ /// /ر/و/ت/ر/ /6/5/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
