# PMS UI and Performance Audit

- Generated: 2026-11-09T10:04:29.480Z
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
| visibleButtonsInventoried | 312 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 400 |
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
| dashboard | loaded | 3937 | 6596 | 0 | 4 | 2 | no |
| projects | loaded | 4395 | 7052 | 0 | 1 | 2 | no |
| project-detail | loaded | 3896 | 6553 | 0 | 2 | 0 | no |
| print-design | loaded | 2877 | 5533 | 1 | 15 | 6 | no |
| print-output | loaded | 3881 | 6538 | 0 | 2 | 6 | no |
| events | loaded | 3403 | 6061 | 0 | 7 | 2 | no |
| workflows | loaded | 4407 | 7062 | 0 | 1 | 2 | no |
| project-statuses | loaded | 7897 | 10553 | 0 | 9 | 1 | no |
| event-types | loaded | 4381 | 7041 | 0 | 58 | 1 | no |
| information-types | loaded | 4905 | 7561 | 0 | 1 | 1 | no |
| procurement | loaded | 3381 | 23362 | 0 | 9 | 0 | no |
| attachments | loaded | 2905 | 5562 | 0 | 1 | 2 | no |
| reports | loaded | 3376 | 6034 | 0 | 8 | 12 | no |
| users | loaded | 2379 | 5035 | 0 | 27 | 1 | no |
| departments | loaded | 2872 | 5527 | 0 | 8 | 1 | no |
| roles | loaded | 3376 | 6032 | 0 | 1 | 1 | no |
| permissions | loaded | 2898 | 5555 | 0 | 0 | 1 | no |
| audit | loaded | 2887 | 5545 | 0 | 1 | 1 | no |
| settings | loaded | 3383 | 6041 | 0 | 1 | 3 | no |
| admin | loaded | 2881 | 5548 | 0 | 156 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T10:06:57.397Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3582 ms | 2148 ms | /د/س/ت/ر/س/ی/ /1/1/2/4/ /// /ر/و/ت/ر/ /1/0/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/2/m/s/×/1/ |
| /procurement/orders | 2261 ms | 1085 ms | /د/س/ت/ر/س/ی/ /7/2/1/ /// /ر/و/ت/ر/ /3/6/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/2/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/6/3/m/s/×/1/,/ /g/e/t/A/l/l/:/1/4/6/m/s/×/1/ |
| /procurement/needs | 3524 ms | 2443 ms | /د/س/ت/ر/س/ی/ /1/8/9/4/ /// /ر/و/ت/ر/ /5/4/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/4/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/4/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/3/m/s/×/1/ |
| /procurement/dashboard | 3263 ms | 1841 ms | /د/س/ت/ر/س/ی/ /1/2/7/0/ /// /ر/و/ت/ر/ /5/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/6/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/9/m/s/×/1/ |
| /procurement/workspace | 4353 ms | 2768 ms | /د/س/ت/ر/س/ی/ /1/8/5/3/ /// /ر/و/ت/ر/ /9/1/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/8/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
