# PMS UI and Performance Audit

- Generated: 2026-11-07T18:26:42.849Z
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
| visibleButtonsInventoried | 285 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 314 |
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
| dashboard | loaded | 2925 | 5581 | 0 | 12 | 2 | no |
| projects | loaded | 3388 | 6045 | 0 | 1 | 2 | no |
| project-detail | loaded | 3386 | 6044 | 0 | 2 | 0 | no |
| print-design | loaded | 3381 | 6042 | 1 | 14 | 5 | no |
| print-output | loaded | 3395 | 6052 | 0 | 1 | 2 | no |
| events | loaded | 2906 | 5561 | 0 | 7 | 2 | no |
| workflows | loaded | 3899 | 6557 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3883 | 6538 | 0 | 9 | 1 | no |
| event-types | loaded | 3883 | 6545 | 0 | 58 | 1 | no |
| information-types | loaded | 3881 | 6551 | 0 | 127 | 1 | no |
| procurement | loaded | 3389 | 25512 | 0 | 9 | 0 | no |
| attachments | loaded | 3386 | 6043 | 0 | 1 | 2 | no |
| reports | loaded | 4389 | 7049 | 0 | 8 | 12 | no |
| users | loaded | 3387 | 6044 | 0 | 1 | 1 | no |
| departments | loaded | 3376 | 6034 | 0 | 8 | 1 | no |
| roles | loaded | 3877 | 6533 | 0 | 21 | 1 | no |
| permissions | loaded | 3375 | 6031 | 0 | 0 | 1 | no |
| audit | loaded | 3384 | 6039 | 0 | 1 | 1 | no |
| settings | loaded | 4963 | 7620 | 0 | 1 | 3 | no |
| admin | loaded | 2378 | 5035 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T18:29:07.704Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4143 ms | 2868 ms | /د/س/ت/ر/س/ی/ /1/4/3/6/ /// /ر/و/ت/ر/ /1/4/3/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/0/m/s/×/1/ |
| /procurement/orders | 3730 ms | 2075 ms | /د/س/ت/ر/س/ی/ /1/2/1/2/ /// /ر/و/ت/ر/ /8/6/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/0/8/m/s/×/1/,/ /g/e/t/A/l/l/:/4/9/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/9/4/m/s/×/1/ |
| /procurement/needs | 3221 ms | 1474 ms | /د/س/ت/ر/س/ی/ /1/0/2/5/ /// /ر/و/ت/ر/ /4/4/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/3/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/9/6/m/s/×/2/ |
| /procurement/dashboard | 3418 ms | 1694 ms | /د/س/ت/ر/س/ی/ /9/2/4/ /// /ر/و/ت/ر/ /7/7/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/2/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/2/m/s/×/1/ |
| /procurement/workspace | 4647 ms | 2820 ms | /د/س/ت/ر/س/ی/ /1/9/4/4/ /// /ر/و/ت/ر/ /8/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/0/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/9/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
