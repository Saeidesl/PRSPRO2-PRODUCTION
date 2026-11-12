# PMS UI and Performance Audit

- Generated: 2026-11-12T17:22:25.808Z
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
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 324 |
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
| dashboard | loaded | 4869 | 7527 | 0 | 4 | 2 | no |
| projects | loaded | 3358 | 6014 | 0 | 1 | 2 | no |
| project-detail | loaded | 3854 | 6510 | 0 | 2 | 0 | no |
| print-design | loaded | 4363 | 7021 | 1 | 17 | 7 | no |
| print-output | loaded | 3373 | 6029 | 0 | 2 | 6 | no |
| events | loaded | 3858 | 6515 | 0 | 7 | 2 | no |
| workflows | loaded | 5884 | 8537 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3859 | 6514 | 0 | 1 | 1 | no |
| event-types | loaded | 3851 | 6512 | 0 | 85 | 1 | no |
| information-types | loaded | 3371 | 6028 | 0 | 1 | 1 | no |
| procurement | loaded | 4352 | 31747 | 0 | 9 | 0 | no |
| attachments | loaded | 3360 | 6016 | 0 | 1 | 1 | no |
| reports | loaded | 4873 | 7532 | 0 | 8 | 12 | no |
| users | loaded | 3355 | 6011 | 0 | 1 | 1 | no |
| departments | loaded | 3849 | 6506 | 0 | 8 | 1 | no |
| roles | loaded | 4352 | 7008 | 0 | 1 | 1 | no |
| permissions | loaded | 3853 | 6508 | 0 | 0 | 1 | no |
| audit | loaded | 4362 | 7021 | 0 | 1 | 1 | no |
| settings | loaded | 3349 | 6005 | 0 | 1 | 3 | no |
| admin | loaded | 8059 | 10714 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T17:25:22.165Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5678 ms | 4253 ms | /د/س/ت/ر/س/ی/ /2/8/8/6/ /// /ر/و/ت/ر/ /1/3/6/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/4/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/9/0/8/m/s/×/2/,/ /g/e/t/A/l/l/:/7/7/3/m/s/×/1/ |
| /procurement/orders | 4171 ms | 2467 ms | /د/س/ت/ر/س/ی/ /1/6/9/9/ /// /ر/و/ت/ر/ /7/6/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/1/m/s/×/1/ |
| /procurement/needs | 6493 ms | 3270 ms | /د/س/ت/ر/س/ی/ /2/3/7/0/ /// /ر/و/ت/ر/ /8/9/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/2/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/3/m/s/×/1/ |
| /procurement/dashboard | 3085 ms | 1850 ms | /د/س/ت/ر/س/ی/ /1/2/2/3/ /// /ر/و/ت/ر/ /6/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/4/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/9/m/s/×/1/ |
| /procurement/workspace | 5018 ms | 2987 ms | /د/س/ت/ر/س/ی/ /2/3/2/5/ /// /ر/و/ت/ر/ /6/6/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/9/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/6/4/m/s/×/1/,/ /g/e/t/A/l/l/:/6/6/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
