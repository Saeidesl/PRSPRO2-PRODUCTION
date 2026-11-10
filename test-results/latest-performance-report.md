# PMS UI and Performance Audit

- Generated: 2026-11-10T12:57:01.736Z
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
| visibleButtonsInventoried | 498 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 375 |
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
| dashboard | loaded | 3407 | 6068 | 0 | 4 | 2 | no |
| projects | loaded | 3377 | 6033 | 0 | 1 | 2 | no |
| project-detail | loaded | 3368 | 6025 | 0 | 2 | 0 | no |
| print-design | loaded | 2868 | 5528 | 1 | 17 | 7 | no |
| print-output | loaded | 2867 | 5522 | 0 | 2 | 6 | no |
| events | loaded | 4381 | 7036 | 0 | 7 | 2 | no |
| workflows | loaded | 3414 | 6069 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2874 | 5529 | 0 | 9 | 1 | no |
| event-types | loaded | 3361 | 6020 | 0 | 85 | 1 | no |
| information-types | loaded | 3862 | 6526 | 0 | 136 | 1 | no |
| procurement | loaded | 3370 | 25764 | 0 | 9 | 0 | no |
| attachments | loaded | 3361 | 6017 | 0 | 1 | 2 | no |
| reports | loaded | 3359 | 6019 | 0 | 8 | 12 | no |
| users | loaded | 3396 | 6050 | 0 | 1 | 1 | no |
| departments | loaded | 4382 | 7040 | 0 | 8 | 1 | no |
| roles | loaded | 2855 | 5511 | 0 | 1 | 1 | no |
| permissions | loaded | 3885 | 6541 | 0 | 0 | 1 | no |
| audit | loaded | 4393 | 7050 | 0 | 1 | 1 | no |
| settings | loaded | 2392 | 5048 | 0 | 1 | 3 | no |
| admin | loaded | 5386 | 8054 | 0 | 204 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T12:59:39.109Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3260 ms | 1842 ms | /د/س/ت/ر/س/ی/ /1/0/2/1/ /// /ر/و/ت/ر/ /8/2/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/1/m/s/×/1/ |
| /procurement/orders | 3881 ms | 2176 ms | /د/س/ت/ر/س/ی/ /1/6/5/3/ /// /ر/و/ت/ر/ /5/2/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/1/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/5/3/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/5/0/m/s/×/1/ |
| /procurement/needs | 3884 ms | 1756 ms | /د/س/ت/ر/س/ی/ /1/1/6/5/ /// /ر/و/ت/ر/ /5/8/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/4/m/s/×/1/ |
| /procurement/dashboard | 4470 ms | 2909 ms | /د/س/ت/ر/س/ی/ /2/1/8/6/ /// /ر/و/ت/ر/ /7/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/8/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/7/2/m/s/×/1/ |
| /procurement/workspace | 3419 ms | 1556 ms | /د/س/ت/ر/س/ی/ /1/1/2/0/ /// /ر/و/ت/ر/ /4/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/2/7/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
