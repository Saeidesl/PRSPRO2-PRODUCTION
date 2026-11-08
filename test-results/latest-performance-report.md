# PMS UI and Performance Audit

- Generated: 2026-11-08T13:13:29.351Z
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
| visibleInputsAndControlsInventoried | 45 |
| networkRequestsMeasured | 353 |
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
| dashboard | loaded | 3551 | 6211 | 0 | 4 | 2 | no |
| projects | loaded | 3941 | 6600 | 0 | 1 | 2 | no |
| project-detail | loaded | 4433 | 7092 | 0 | 2 | 0 | no |
| print-design | loaded | 2917 | 5579 | 1 | 14 | 6 | no |
| print-output | loaded | 4438 | 7095 | 0 | 2 | 6 | no |
| events | loaded | 3442 | 6101 | 0 | 7 | 2 | no |
| workflows | loaded | 5449 | 8106 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2907 | 5566 | 0 | 1 | 1 | no |
| event-types | loaded | 3916 | 6583 | 0 | 58 | 1 | no |
| information-types | loaded | 3415 | 6074 | 0 | 1 | 1 | no |
| procurement | loaded | 5476 | 32564 | 0 | 9 | 0 | no |
| attachments | loaded | 8105 | 10762 | 0 | 0 | 0 | no |
| reports | loaded | 3419 | 6080 | 0 | 8 | 12 | no |
| users | loaded | 3417 | 6075 | 0 | 1 | 1 | no |
| departments | loaded | 2957 | 5602 | 0 | 8 | 1 | no |
| roles | loaded | 3911 | 6568 | 0 | 21 | 1 | no |
| permissions | loaded | 3913 | 6569 | 0 | 0 | 1 | no |
| audit | loaded | 3438 | 6093 | 0 | 1 | 1 | no |
| settings | loaded | 2913 | 5570 | 0 | 1 | 3 | no |
| admin | loaded | 3421 | 6078 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T13:16:08.709Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6818 ms | 4897 ms | /د/س/ت/ر/س/ی/ /3/1/9/8/ /// /ر/و/ت/ر/ /1/6/9/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/8/9/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/4/3/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/0/m/s/×/1/ |
| /procurement/orders | 4378 ms | 2483 ms | /د/س/ت/ر/س/ی/ /1/7/7/7/ /// /ر/و/ت/ر/ /7/0/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/0/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/6/1/m/s/×/2/ |
| /procurement/needs | 3621 ms | 1945 ms | /د/س/ت/ر/س/ی/ /1/4/0/0/ /// /ر/و/ت/ر/ /5/4/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/1/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/3/m/s/×/1/ |
| /procurement/dashboard | 3823 ms | 2373 ms | /د/س/ت/ر/س/ی/ /1/8/2/0/ /// /ر/و/ت/ر/ /5/5/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/1/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/0/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/2/3/m/s/×/2/ |
| /procurement/workspace | 2968 ms | 1673 ms | /د/س/ت/ر/س/ی/ /1/1/0/4/ /// /ر/و/ت/ر/ /5/6/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/5/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
