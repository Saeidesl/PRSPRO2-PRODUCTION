# PMS UI and Performance Audit

- Generated: 2026-11-09T09:57:51.414Z
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
| visibleButtonsInventoried | 179 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 387 |
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
| dashboard | loaded | 3442 | 6102 | 0 | 4 | 2 | no |
| projects | loaded | 2900 | 5556 | 0 | 1 | 2 | no |
| project-detail | loaded | 2906 | 5563 | 0 | 2 | 0 | no |
| print-design | loaded | 3888 | 6546 | 1 | 15 | 6 | no |
| print-output | loaded | 4395 | 7050 | 0 | 2 | 6 | no |
| events | loaded | 3411 | 6069 | 0 | 7 | 2 | no |
| workflows | loaded | 3912 | 6567 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3900 | 6556 | 0 | 9 | 1 | no |
| event-types | loaded | 4896 | 7556 | 0 | 58 | 1 | no |
| information-types | loaded | 3382 | 6036 | 0 | 1 | 1 | no |
| procurement | loaded | 3387 | 26661 | 0 | 9 | 0 | no |
| attachments | loaded | 2917 | 5575 | 0 | 1 | 2 | no |
| reports | loaded | 2383 | 5041 | 0 | 8 | 12 | no |
| users | loaded | 2884 | 5542 | 0 | 27 | 1 | no |
| departments | loaded | 3386 | 6043 | 0 | 8 | 1 | no |
| roles | loaded | 2879 | 5535 | 0 | 21 | 1 | no |
| permissions | loaded | 2881 | 5535 | 0 | 0 | 1 | no |
| audit | loaded | 3414 | 6070 | 0 | 1 | 1 | no |
| settings | loaded | 2889 | 5545 | 0 | 1 | 3 | no |
| admin | loaded | 3385 | 6040 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T10:00:19.314Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3399 ms | 1983 ms | /د/س/ت/ر/س/ی/ /9/2/3/ /// /ر/و/ت/ر/ /1/0/5/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/0/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/1/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/3/m/s/×/1/ |
| /procurement/orders | 4074 ms | 2353 ms | /د/س/ت/ر/س/ی/ /1/7/5/9/ /// /ر/و/ت/ر/ /5/9/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/5/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/8/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/8/2/m/s/×/1/ |
| /procurement/needs | 4493 ms | 2753 ms | /د/س/ت/ر/س/ی/ /1/7/6/0/ /// /ر/و/ت/ر/ /9/9/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/0/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/ |
| /procurement/dashboard | 4714 ms | 2858 ms | /د/س/ت/ر/س/ی/ /1/9/8/2/ /// /ر/و/ت/ر/ /8/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/4/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/3/8/m/s/×/1/ |
| /procurement/workspace | 3826 ms | 1881 ms | /د/س/ت/ر/س/ی/ /1/3/0/5/ /// /ر/و/ت/ر/ /5/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
