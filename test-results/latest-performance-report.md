# PMS UI and Performance Audit

- Generated: 2026-11-07T18:18:12.203Z
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
| visibleButtonsInventoried | 177 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 337 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 2902 | 5562 | 0 | 4 | 2 | no |
| projects | loaded | 4893 | 7551 | 0 | 1 | 2 | no |
| project-detail | loaded | 3407 | 6064 | 0 | 2 | 0 | no |
| print-design | loaded | 3384 | 6040 | 1 | 14 | 5 | no |
| print-output | loaded | 2880 | 5537 | 0 | 1 | 2 | no |
| events | loaded | 3903 | 6561 | 0 | 7 | 2 | no |
| workflows | loaded | 4399 | 7055 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3380 | 6036 | 0 | 9 | 1 | no |
| event-types | loaded | 5384 | 8047 | 0 | 58 | 1 | no |
| information-types | loaded | 3379 | 6036 | 0 | 1 | 1 | no |
| procurement | loaded | 3883 | 26629 | 0 | 9 | 0 | no |
| attachments | loaded | 3380 | 6036 | 0 | 1 | 2 | no |
| reports | loaded | 2875 | 5532 | 0 | 8 | 12 | no |
| users | loaded | 3890 | 6547 | 0 | 27 | 1 | no |
| departments | loaded | 8089 | 10744 | 0 | 8 | 1 | no |
| roles | loaded | 3374 | 6032 | 0 | 21 | 1 | no |
| permissions | loaded | 2910 | 5568 | 0 | 0 | 1 | no |
| audit | loaded | 4378 | 7035 | 0 | 1 | 1 | no |
| settings | loaded | 2883 | 5540 | 0 | 1 | 3 | no |
| admin | loaded | 3381 | 6035 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T18:20:48.627Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4426 ms | 3161 ms | /د/س/ت/ر/س/ی/ /2/2/9/3/ /// /ر/و/ت/ر/ /8/6/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/4/2/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/3/1/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/3/m/s/×/1/ |
| /procurement/orders | 4075 ms | 2392 ms | /د/س/ت/ر/س/ی/ /1/8/9/9/ /// /ر/و/ت/ر/ /4/9/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/6/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/5/m/s/×/1/ |
| /procurement/needs | 3025 ms | 1661 ms | /د/س/ت/ر/س/ی/ /1/2/1/2/ /// /ر/و/ت/ر/ /4/4/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/0/m/s/×/1/ |
| /procurement/dashboard | 4821 ms | 3290 ms | /د/س/ت/ر/س/ی/ /2/3/9/7/ /// /ر/و/ت/ر/ /8/9/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/9/m/s/×/1/ |
| /procurement/workspace | 3519 ms | 1891 ms | /د/س/ت/ر/س/ی/ /1/2/8/0/ /// /ر/و/ت/ر/ /6/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
