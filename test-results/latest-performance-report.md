# PMS UI and Performance Audit

- Generated: 2026-11-08T14:11:42.958Z
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
| visibleButtonsInventoried | 274 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 382 |
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
| dashboard | loaded | 4409 | 7068 | 0 | 4 | 2 | no |
| projects | loaded | 3899 | 6556 | 0 | 1 | 2 | no |
| project-detail | loaded | 3390 | 6046 | 0 | 2 | 0 | no |
| print-design | loaded | 2379 | 5038 | 1 | 14 | 6 | no |
| print-output | loaded | 2385 | 5039 | 0 | 2 | 6 | no |
| events | loaded | 2382 | 5039 | 0 | 7 | 2 | no |
| workflows | loaded | 3920 | 6574 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2887 | 5543 | 0 | 9 | 1 | no |
| event-types | loaded | 2882 | 5543 | 0 | 58 | 1 | no |
| information-types | loaded | 2878 | 5533 | 0 | 1 | 1 | no |
| procurement | loaded | 2403 | 23495 | 0 | 9 | 0 | no |
| attachments | loaded | 2417 | 5075 | 0 | 1 | 2 | no |
| reports | loaded | 2881 | 5540 | 0 | 8 | 12 | no |
| users | loaded | 3408 | 6063 | 0 | 1 | 1 | no |
| departments | loaded | 2880 | 5446 | 0 | 8 | 1 | no |
| roles | loaded | 3384 | 6042 | 0 | 21 | 1 | no |
| permissions | loaded | 3390 | 6043 | 0 | 0 | 1 | no |
| audit | loaded | 4916 | 7578 | 0 | 1 | 1 | no |
| settings | loaded | 3465 | 6122 | 0 | 1 | 3 | no |
| admin | loaded | 3893 | 6560 | 0 | 125 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T14:14:01.325Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4005 ms | 2207 ms | /د/س/ت/ر/س/ی/ /1/0/9/8/ /// /ر/و/ت/ر/ /1/1/0/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/9/m/s/×/1/ |
| /procurement/orders | 2601 ms | 1208 ms | /د/س/ت/ر/س/ی/ /7/6/0/ /// /ر/و/ت/ر/ /4/4/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/6/0/m/s/×/1/,/ /g/e/t/A/l/l/:/1/5/6/m/s/×/1/ |
| /procurement/needs | 3899 ms | 2414 ms | /د/س/ت/ر/س/ی/ /1/6/4/0/ /// /ر/و/ت/ر/ /7/7/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/4/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/6/m/s/×/1/ |
| /procurement/dashboard | 3195 ms | 1881 ms | /د/س/ت/ر/س/ی/ /1/3/2/3/ /// /ر/و/ت/ر/ /5/5/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/8/m/s/×/1/ |
| /procurement/workspace | 4526 ms | 3097 ms | /د/س/ت/ر/س/ی/ /2/2/8/3/ /// /ر/و/ت/ر/ /8/1/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/3/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/9/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/7/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
