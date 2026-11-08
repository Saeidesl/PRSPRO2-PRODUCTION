# PMS UI and Performance Audit

- Generated: 2026-11-08T17:38:56.925Z
- Base URL: http://127.0.0.1:4173/PRSPRO2/
- Mode: authenticated-read-only
- Overall: **needs-attention**

## Summary

| Metric | Result |
|---|---:|
| requestedRoutes | 20 |
| loadedRoutes | 19 |
| permissionDeniedRoutes | 1 |
| failedRoutes | 0 |
| mobileRoutesWithHorizontalOverflow | 0 |
| visibleFormsInventoried | 12 |
| dynamicFormsInventoried | 11 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 124 |
| visibleInputsAndControlsInventoried | 45 |
| networkRequestsMeasured | 337 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 1 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 2924 | 5586 | 0 | 4 | 2 | no |
| projects | loaded | 3407 | 6063 | 0 | 1 | 2 | no |
| project-detail | loaded | 3392 | 6047 | 0 | 2 | 0 | no |
| print-design | loaded | 5424 | 8086 | 1 | 15 | 6 | no |
| print-output | loaded | 3889 | 6548 | 0 | 2 | 6 | no |
| events | loaded | 3889 | 6547 | 0 | 7 | 2 | no |
| workflows | loaded | 4420 | 7078 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4414 | 7073 | 0 | 1 | 1 | no |
| event-types | loaded | 4386 | 7049 | 0 | 58 | 1 | no |
| information-types | loaded | 3397 | 6054 | 0 | 1 | 1 | no |
| procurement | loaded | 3887 | 33246 | 0 | 9 | 0 | no |
| attachments | permission-denied | 8084 | 10741 | 0 | 0 | 0 | no |
| reports | loaded | 4949 | 7613 | 0 | 8 | 12 | no |
| users | loaded | 3886 | 6540 | 0 | 1 | 1 | no |
| departments | loaded | 3894 | 6553 | 0 | 8 | 1 | no |
| roles | loaded | 3380 | 6039 | 0 | 1 | 1 | no |
| permissions | loaded | 4890 | 7549 | 0 | 0 | 1 | no |
| audit | loaded | 3890 | 6546 | 0 | 1 | 1 | no |
| settings | loaded | 5953 | 8609 | 0 | 1 | 3 | no |
| admin | loaded | 3380 | 6038 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T17:41:41.674Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4905 ms | 3285 ms | /د/س/ت/ر/س/ی/ /1/7/7/4/ /// /ر/و/ت/ر/ /1/5/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/4/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/6/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/5/8/m/s/×/1/ |
| /procurement/orders | 5389 ms | 2381 ms | /د/س/ت/ر/س/ی/ /1/8/1/6/ /// /ر/و/ت/ر/ /5/6/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/5/m/s/×/1/ |
| /procurement/needs | 4673 ms | 3081 ms | /د/س/ت/ر/س/ی/ /2/3/0/4/ /// /ر/و/ت/ر/ /7/7/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/6/m/s/×/1/ |
| /procurement/dashboard | 4863 ms | 3205 ms | /د/س/ت/ر/س/ی/ /2/0/8/9/ /// /ر/و/ت/ر/ /1/1/1/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/6/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/5/6/0/m/s/×/1/ |
| /procurement/workspace | 5544 ms | 3240 ms | /د/س/ت/ر/س/ی/ /2/1/2/5/ /// /ر/و/ت/ر/ /1/1/1/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/3/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/9/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/6/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
