# PMS UI and Performance Audit

- Generated: 2026-11-14T17:42:57.152Z
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
| visibleButtonsInventoried | 287 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 332 |
| procurementApiRequestsMeasured | 7 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 4370 | 7025 | 0 | 4 | 2 | no |
| projects | loaded | 3864 | 6519 | 0 | 1 | 2 | no |
| project-detail | loaded | 3864 | 6519 | 0 | 2 | 0 | no |
| print-design | loaded | 4364 | 7022 | 1 | 17 | 7 | no |
| print-output | loaded | 3857 | 6510 | 0 | 2 | 6 | no |
| events | loaded | 3912 | 6569 | 0 | 5 | 2 | no |
| workflows | loaded | 3379 | 6035 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3865 | 6520 | 0 | 1 | 1 | no |
| event-types | loaded | 2351 | 5012 | 0 | 85 | 1 | no |
| information-types | loaded | 5862 | 8526 | 0 | 136 | 1 | no |
| procurement | loaded | 4356 | 32813 | 0 | 9 | 0 | no |
| attachments | loaded | 4359 | 7014 | 0 | 1 | 1 | no |
| reports | loaded | 3361 | 6020 | 0 | 8 | 12 | no |
| users | loaded | 3358 | 6013 | 0 | 1 | 1 | no |
| departments | loaded | 3858 | 6514 | 0 | 8 | 1 | no |
| roles | loaded | 2849 | 5504 | 0 | 1 | 1 | no |
| permissions | loaded | 5854 | 8507 | 0 | 0 | 1 | no |
| audit | loaded | 4356 | 7012 | 0 | 1 | 1 | no |
| settings | loaded | 3877 | 6533 | 0 | 1 | 3 | no |
| admin | loaded | 3861 | 6517 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-14T17:45:46.164Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6910 ms | 4170 ms | /د/س/ت/ر/س/ی/ /2/9/6/7/ /// /ر/و/ت/ر/ /1/2/0/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/4/9/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/2/1/1/m/s/×/1/,/ /g/e/t/A/l/l/:/6/1/5/m/s/×/1/ |
| /procurement/orders | 4277 ms | 2885 ms | /د/س/ت/ر/س/ی/ /1/8/0/9/ /// /ر/و/ت/ر/ /1/0/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/3/m/s/×/1/ |
| /procurement/needs | 3076 ms | 2120 ms | /د/س/ت/ر/س/ی/ /1/6/4/0/ /// /ر/و/ت/ر/ /4/8/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/0/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/1/5/m/s/×/1/ |
| /procurement/dashboard | 5044 ms | 3545 ms | /د/س/ت/ر/س/ی/ /2/6/5/5/ /// /ر/و/ت/ر/ /8/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/3/0/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/8/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/8/4/m/s/×/1/ |
| /procurement/workspace | 4685 ms | 2725 ms | /د/س/ت/ر/س/ی/ /1/8/7/4/ /// /ر/و/ت/ر/ /8/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/6/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
