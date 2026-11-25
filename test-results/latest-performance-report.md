# PMS UI and Performance Audit

- Generated: 2026-11-25T20:02:20.294Z
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
| visibleButtonsInventoried | 804 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 365 |
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
| dashboard | loaded | 3911 | 6571 | 0 | 4 | 2 | no |
| projects | loaded | 2877 | 5535 | 0 | 1 | 2 | no |
| project-detail | loaded | 3375 | 6031 | 0 | 2 | 0 | no |
| print-design | loaded | 3377 | 6038 | 1 | 17 | 7 | no |
| print-output | loaded | 3884 | 6540 | 0 | 2 | 6 | no |
| events | loaded | 3383 | 6041 | 0 | 5 | 2 | no |
| workflows | loaded | 3913 | 6571 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3375 | 6033 | 0 | 1 | 1 | no |
| event-types | loaded | 2871 | 5535 | 0 | 85 | 1 | no |
| information-types | loaded | 2391 | 5056 | 0 | 142 | 1 | no |
| procurement | loaded | 3376 | 25664 | 0 | 9 | 0 | no |
| attachments | loaded | 5896 | 8552 | 0 | 1 | 1 | no |
| reports | loaded | 3373 | 6035 | 0 | 8 | 12 | no |
| users | loaded | 2898 | 5556 | 0 | 1 | 1 | no |
| departments | loaded | 4377 | 7032 | 0 | 8 | 1 | no |
| roles | loaded | 3373 | 6031 | 0 | 1 | 1 | no |
| permissions | loaded | 4876 | 7531 | 0 | 0 | 1 | no |
| audit | loaded | 2872 | 5530 | 0 | 1 | 1 | no |
| settings | loaded | 3888 | 6544 | 0 | 1 | 3 | no |
| admin | loaded | 3884 | 6574 | 0 | 514 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T20:04:46.127Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3333 ms | 1896 ms | /د/س/ت/ر/س/ی/ /1/0/4/1/ /// /ر/و/ت/ر/ /8/5/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/5/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/3/m/s/×/1/ |
| /procurement/orders | 3051 ms | 1750 ms | /د/س/ت/ر/س/ی/ /1/3/9/0/ /// /ر/و/ت/ر/ /3/6/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/9/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/6/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/7/m/s/×/1/ |
| /procurement/needs | 3762 ms | 2237 ms | /د/س/ت/ر/س/ی/ /1/5/0/0/ /// /ر/و/ت/ر/ /7/3/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/9/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/9/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/2/m/s/×/1/ |
| /procurement/dashboard | 5042 ms | 3312 ms | /د/س/ت/ر/س/ی/ /2/5/7/2/ /// /ر/و/ت/ر/ /7/4/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/4/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/8/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/8/m/s/×/1/ |
| /procurement/workspace | 3609 ms | 1942 ms | /د/س/ت/ر/س/ی/ /1/4/6/1/ /// /ر/و/ت/ر/ /4/8/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
