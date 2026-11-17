# PMS UI and Performance Audit

- Generated: 2026-11-17T19:06:25.617Z
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
| visibleButtonsInventoried | 151 |
| visibleInputsAndControlsInventoried | 46 |
| networkRequestsMeasured | 315 |
| procurementApiRequestsMeasured | 7 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 3994 | 6653 | 0 | 4 | 2 | no |
| projects | loaded | 4403 | 7060 | 0 | 1 | 2 | no |
| project-detail | loaded | 3903 | 6560 | 0 | 2 | 0 | no |
| print-design | loaded | 3388 | 6049 | 1 | 17 | 7 | no |
| print-output | loaded | 6901 | 9556 | 0 | 2 | 6 | no |
| events | loaded | 5921 | 8576 | 0 | 5 | 2 | no |
| workflows | loaded | 3433 | 6088 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5390 | 8047 | 0 | 1 | 1 | no |
| event-types | loaded | 4885 | 7550 | 0 | 85 | 1 | no |
| information-types | loaded | 8078 | 10734 | 0 | 0 | 0 | no |
| procurement | loaded | 3379 | 34563 | 0 | 9 | 0 | no |
| attachments | loaded | 5394 | 8052 | 0 | 1 | 1 | no |
| reports | loaded | 3878 | 6539 | 0 | 8 | 12 | no |
| users | loaded | 3417 | 6073 | 0 | 1 | 1 | no |
| departments | loaded | 5914 | 8570 | 0 | 8 | 1 | no |
| roles | loaded | 3889 | 6546 | 0 | 1 | 1 | no |
| permissions | loaded | 4417 | 7071 | 0 | 0 | 1 | no |
| audit | loaded | 4390 | 7049 | 0 | 1 | 1 | no |
| settings | loaded | 2903 | 5559 | 0 | 1 | 3 | no |
| admin | loaded | 2885 | 5542 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T19:09:28.312Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5699 ms | 3426 ms | /د/س/ت/ر/س/ی/ /1/9/5/1/ /// /ر/و/ت/ر/ /1/4/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/8/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/5/6/6/m/s/×/1/ |
| /procurement/orders | 4783 ms | 3075 ms | /د/س/ت/ر/س/ی/ /2/2/9/9/ /// /ر/و/ت/ر/ /7/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/5/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/9/9/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/9/6/m/s/×/1/ |
| /procurement/needs | 6250 ms | 2664 ms | /د/س/ت/ر/س/ی/ /1/8/3/1/ /// /ر/و/ت/ر/ /8/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/8/m/s/×/1/ |
| /procurement/dashboard | 4842 ms | 2981 ms | /د/س/ت/ر/س/ی/ /1/9/0/0/ /// /ر/و/ت/ر/ /1/0/7/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/4/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/1/9/m/s/×/1/,/ /g/e/t/A/l/l/:/6/2/1/m/s/×/1/ |
| /procurement/workspace | 5623 ms | 2413 ms | /د/س/ت/ر/س/ی/ /1/8/0/3/ /// /ر/و/ت/ر/ /6/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
