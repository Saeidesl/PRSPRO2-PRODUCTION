# PMS UI and Performance Audit

- Generated: 2026-11-09T13:29:34.214Z
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
| visibleButtonsInventoried | 327 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 335 |
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
| dashboard | loaded | 4410 | 7070 | 0 | 4 | 2 | no |
| projects | loaded | 3393 | 6049 | 0 | 1 | 2 | no |
| project-detail | loaded | 4896 | 7553 | 0 | 2 | 0 | no |
| print-design | loaded | 3384 | 6044 | 1 | 15 | 6 | no |
| print-output | loaded | 3909 | 6567 | 0 | 2 | 6 | no |
| events | loaded | 4399 | 7056 | 0 | 7 | 2 | no |
| workflows | loaded | 3417 | 6075 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4399 | 7056 | 0 | 1 | 1 | no |
| event-types | loaded | 3881 | 6544 | 0 | 76 | 1 | no |
| information-types | loaded | 3885 | 6542 | 0 | 1 | 1 | no |
| procurement | loaded | 4384 | 30911 | 0 | 9 | 0 | no |
| attachments | loaded | 8083 | 10741 | 0 | 1 | 2 | no |
| reports | loaded | 3874 | 6535 | 0 | 8 | 12 | no |
| users | loaded | 3406 | 6063 | 0 | 1 | 1 | no |
| departments | loaded | 2403 | 5060 | 0 | 8 | 1 | no |
| roles | loaded | 3383 | 6040 | 0 | 21 | 1 | no |
| permissions | loaded | 3881 | 6539 | 0 | 0 | 1 | no |
| audit | loaded | 4405 | 7061 | 0 | 1 | 1 | no |
| settings | loaded | 4907 | 7565 | 0 | 1 | 3 | no |
| admin | loaded | 3389 | 6114 | 0 | 167 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T13:32:18.037Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3726 ms | 2047 ms | /د/س/ت/ر/س/ی/ /1/1/0/6/ /// /ر/و/ت/ر/ /9/4/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/8/m/s/×/1/ |
| /procurement/orders | 5039 ms | 2602 ms | /د/س/ت/ر/س/ی/ /2/1/0/0/ /// /ر/و/ت/ر/ /5/0/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/4/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/9/2/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/5/m/s/×/1/ |
| /procurement/needs | 5095 ms | 3228 ms | /د/س/ت/ر/س/ی/ /2/6/7/2/ /// /ر/و/ت/ر/ /5/5/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/4/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/0/4/2/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/0/3/9/m/s/×/1/ |
| /procurement/dashboard | 3188 ms | 1789 ms | /د/س/ت/ر/س/ی/ /1/4/1/4/ /// /ر/و/ت/ر/ /3/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/0/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/1/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/2/m/s/×/1/ |
| /procurement/workspace | 5510 ms | 3239 ms | /د/س/ت/ر/س/ی/ /1/8/7/3/ /// /ر/و/ت/ر/ /1/3/6/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/1/2/m/s/×/1/,/ /g/e/t/A/l/l/:/4/9/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
