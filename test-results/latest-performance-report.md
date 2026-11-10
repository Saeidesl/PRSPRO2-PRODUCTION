# PMS UI and Performance Audit

- Generated: 2026-11-10T20:18:40.217Z
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
| visibleButtonsInventoried | 154 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 333 |
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
| dashboard | loaded | 4441 | 7101 | 0 | 4 | 2 | no |
| projects | loaded | 3902 | 6560 | 0 | 1 | 2 | no |
| project-detail | loaded | 3890 | 6545 | 0 | 2 | 0 | no |
| print-design | loaded | 4396 | 7056 | 1 | 17 | 7 | no |
| print-output | loaded | 3892 | 6550 | 0 | 2 | 6 | no |
| events | loaded | 3904 | 6562 | 0 | 7 | 2 | no |
| workflows | loaded | 3405 | 6060 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3905 | 6562 | 0 | 1 | 1 | no |
| event-types | loaded | 3883 | 6547 | 0 | 85 | 1 | no |
| information-types | loaded | 4393 | 7051 | 0 | 1 | 1 | no |
| procurement | loaded | 3884 | 32080 | 0 | 9 | 0 | no |
| attachments | loaded | 3385 | 6042 | 0 | 1 | 2 | no |
| reports | loaded | 3377 | 6038 | 0 | 8 | 12 | no |
| users | loaded | 3389 | 6044 | 0 | 1 | 1 | no |
| departments | loaded | 4924 | 7581 | 0 | 8 | 1 | no |
| roles | loaded | 4383 | 7037 | 0 | 1 | 1 | no |
| permissions | loaded | 4413 | 7071 | 0 | 0 | 1 | no |
| audit | loaded | 5398 | 8055 | 0 | 1 | 1 | no |
| settings | loaded | 3891 | 6548 | 0 | 1 | 3 | no |
| admin | loaded | 4896 | 7553 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T20:21:28.242Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3870 ms | 2483 ms | /د/س/ت/ر/س/ی/ /1/3/7/6/ /// /ر/و/ت/ر/ /1/1/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/6/m/s/×/1/ |
| /procurement/orders | 5317 ms | 3264 ms | /د/س/ت/ر/س/ی/ /2/4/5/0/ /// /ر/و/ت/ر/ /8/1/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/3/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/5/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/1/9/m/s/×/1/ |
| /procurement/needs | 4679 ms | 3108 ms | /د/س/ت/ر/س/ی/ /2/5/5/2/ /// /ر/و/ت/ر/ /5/5/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/4/4/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/1/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/6/4/6/m/s/×/1/ |
| /procurement/dashboard | 5734 ms | 4068 ms | /د/س/ت/ر/س/ی/ /3/5/5/7/ /// /ر/و/ت/ر/ /5/1/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/7/8/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/7/9/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/2/7/6/m/s/×/1/ |
| /procurement/workspace | 4617 ms | 3091 ms | /د/س/ت/ر/س/ی/ /1/6/8/1/ /// /ر/و/ت/ر/ /1/4/1/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/6/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
