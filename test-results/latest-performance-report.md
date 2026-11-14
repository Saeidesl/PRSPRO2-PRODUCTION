# PMS UI and Performance Audit

- Generated: 2026-11-14T19:45:59.319Z
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
| visibleButtonsInventoried | 534 |
| visibleInputsAndControlsInventoried | 46 |
| networkRequestsMeasured | 336 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 3933 | 6593 | 0 | 4 | 2 | no |
| projects | loaded | 3390 | 6049 | 0 | 1 | 2 | no |
| project-detail | loaded | 3882 | 6538 | 0 | 2 | 0 | no |
| print-design | loaded | 3373 | 6034 | 1 | 17 | 7 | no |
| print-output | loaded | 4382 | 7037 | 0 | 2 | 6 | no |
| events | loaded | 3404 | 6062 | 0 | 5 | 2 | no |
| workflows | loaded | 4406 | 7064 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4383 | 7042 | 0 | 1 | 1 | no |
| event-types | loaded | 4378 | 7043 | 0 | 85 | 1 | no |
| information-types | loaded | 3377 | 6035 | 0 | 1 | 1 | no |
| procurement | loaded | 4382 | 27746 | 0 | 9 | 0 | no |
| attachments | loaded | 3895 | 6553 | 0 | 1 | 1 | no |
| reports | loaded | 4382 | 7044 | 0 | 8 | 12 | no |
| users | loaded | 3878 | 6536 | 0 | 1 | 1 | no |
| departments | loaded | 3381 | 6039 | 0 | 8 | 1 | no |
| roles | loaded | 3376 | 6033 | 0 | 1 | 1 | no |
| permissions | loaded | 8068 | 10723 | 0 | 0 | 0 | no |
| audit | loaded | 3380 | 6038 | 0 | 1 | 1 | no |
| settings | loaded | 3384 | 6042 | 0 | 1 | 3 | no |
| admin | loaded | 4398 | 7149 | 0 | 385 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-14T19:48:32.826Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4621 ms | 2905 ms | /د/س/ت/ر/س/ی/ /1/5/4/4/ /// /ر/و/ت/ر/ /1/3/6/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/6/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/0/m/s/×/1/ |
| /procurement/orders | 4636 ms | 2944 ms | /د/س/ت/ر/س/ی/ /1/3/3/9/ /// /ر/و/ت/ر/ /1/6/0/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/2/m/s/×/1/ |
| /procurement/needs | 3228 ms | 1854 ms | /د/س/ت/ر/س/ی/ /1/2/8/5/ /// /ر/و/ت/ر/ /5/6/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/6/m/s/×/1/ |
| /procurement/dashboard | 4372 ms | 2842 ms | /د/س/ت/ر/س/ی/ /2/2/3/5/ /// /ر/و/ت/ر/ /6/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/2/m/s/×/1/,/ /g/e/t/A/l/l/:/6/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/2/m/s/×/1/ |
| /procurement/workspace | 3513 ms | 1713 ms | /د/س/ت/ر/س/ی/ /1/1/9/9/ /// /ر/و/ت/ر/ /5/1/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
