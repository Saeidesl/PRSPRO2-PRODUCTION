# PMS UI and Performance Audit

- Generated: 2026-11-19T16:57:30.330Z
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
| visibleButtonsInventoried | 149 |
| visibleInputsAndControlsInventoried | 45 |
| networkRequestsMeasured | 325 |
| procurementApiRequestsMeasured | 9 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 4922 | 7582 | 0 | 4 | 2 | no |
| projects | loaded | 3393 | 6051 | 0 | 1 | 2 | no |
| project-detail | loaded | 2884 | 5542 | 0 | 2 | 0 | no |
| print-design | loaded | 4383 | 7043 | 1 | 17 | 7 | no |
| print-output | loaded | 3888 | 6546 | 0 | 2 | 6 | no |
| events | loaded | 3905 | 6562 | 0 | 5 | 2 | no |
| workflows | loaded | 3894 | 6552 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5404 | 8062 | 0 | 1 | 1 | no |
| event-types | loaded | 2874 | 5535 | 0 | 85 | 1 | no |
| information-types | loaded | 4384 | 7039 | 0 | 1 | 1 | no |
| procurement | loaded | 2874 | 28563 | 0 | 9 | 0 | no |
| attachments | loaded | 5887 | 8543 | 0 | 1 | 1 | no |
| reports | loaded | 5381 | 8042 | 0 | 8 | 12 | no |
| users | loaded | 4383 | 7041 | 0 | 1 | 1 | no |
| departments | loaded | 3882 | 6539 | 0 | 8 | 1 | no |
| roles | loaded | 3876 | 6533 | 0 | 1 | 1 | no |
| permissions | loaded | 3872 | 6530 | 0 | 0 | 1 | no |
| audit | loaded | 3879 | 6548 | 0 | 1 | 1 | no |
| settings | loaded | 4953 | 7611 | 0 | 1 | 3 | no |
| admin | loaded | 8069 | 10726 | 0 | 0 | 0 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-19T17:00:13.374Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 7337 ms | 3401 ms | /د/س/ت/ر/س/ی/ /1/1/5/8/ /// /ر/و/ت/ر/ /2/2/4/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/2/8/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/2/m/s/×/1/ |
| /procurement/orders | 3912 ms | 1805 ms | /د/س/ت/ر/س/ی/ /1/2/6/4/ /// /ر/و/ت/ر/ /5/4/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/8/m/s/×/1/ |
| /procurement/needs | 2835 ms | 1589 ms | /د/س/ت/ر/س/ی/ /1/1/6/2/ /// /ر/و/ت/ر/ /4/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/6/m/s/×/1/ |
| /procurement/dashboard | 2845 ms | 1800 ms | /د/س/ت/ر/س/ی/ /1/2/2/0/ /// /ر/و/ت/ر/ /5/8/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/4/m/s/×/1/ |
| /procurement/workspace | 4282 ms | 2225 ms | /د/س/ت/ر/س/ی/ /1/7/2/1/ /// /ر/و/ت/ر/ /5/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/4/7/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/0/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
