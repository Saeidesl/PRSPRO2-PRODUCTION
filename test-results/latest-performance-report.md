# PMS UI and Performance Audit

- Generated: 2026-11-07T19:27:15.602Z
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
| visibleButtonsInventoried | 143 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 358 |
| procurementApiRequestsMeasured | 12 |
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
| dashboard | loaded | 3972 | 6631 | 0 | 4 | 2 | no |
| projects | loaded | 3896 | 6553 | 0 | 1 | 2 | no |
| project-detail | loaded | 3889 | 6545 | 0 | 2 | 0 | no |
| print-design | loaded | 5898 | 8555 | 1 | 14 | 5 | no |
| print-output | loaded | 2886 | 5543 | 0 | 1 | 2 | no |
| events | loaded | 3391 | 6046 | 0 | 7 | 2 | no |
| workflows | loaded | 3901 | 6558 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3881 | 6537 | 0 | 1 | 1 | no |
| event-types | loaded | 2888 | 5551 | 0 | 58 | 1 | no |
| information-types | loaded | 3386 | 6041 | 0 | 1 | 1 | no |
| procurement | loaded | 3406 | 26496 | 0 | 9 | 0 | no |
| attachments | loaded | 4392 | 7048 | 0 | 1 | 2 | no |
| reports | loaded | 3395 | 6056 | 0 | 8 | 12 | no |
| users | loaded | 3393 | 6047 | 0 | 1 | 1 | no |
| departments | loaded | 2927 | 5584 | 0 | 8 | 1 | no |
| roles | loaded | 2882 | 5539 | 0 | 21 | 1 | no |
| permissions | loaded | 2878 | 5532 | 0 | 0 | 1 | no |
| audit | loaded | 2933 | 5590 | 0 | 1 | 1 | no |
| settings | loaded | 3403 | 6059 | 0 | 1 | 3 | no |
| admin | loaded | 3385 | 6043 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T19:29:49.880Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5619 ms | 3760 ms | /د/س/ت/ر/س/ی/ /2/2/1/2/ /// /ر/و/ت/ر/ /1/5/4/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/6/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/0/m/s/×/1/ |
| /procurement/orders | 5203 ms | 3037 ms | /د/س/ت/ر/س/ی/ /2/1/7/2/ /// /ر/و/ت/ر/ /8/6/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/7/m/s/×/1/ |
| /procurement/needs | 3051 ms | 1332 ms | /د/س/ت/ر/س/ی/ /9/1/1/ /// /ر/و/ت/ر/ /4/2/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/2/m/s/×/1/ |
| /procurement/dashboard | 3003 ms | 1569 ms | /د/س/ت/ر/س/ی/ /1/0/2/3/ /// /ر/و/ت/ر/ /5/4/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/4/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/2/m/s/×/1/ |
| /procurement/workspace | 3526 ms | 1754 ms | /د/س/ت/ر/س/ی/ /1/1/4/3/ /// /ر/و/ت/ر/ /6/1/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/7/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
