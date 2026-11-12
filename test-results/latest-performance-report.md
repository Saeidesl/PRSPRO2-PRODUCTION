# PMS UI and Performance Audit

- Generated: 2026-11-12T17:02:04.312Z
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
| networkRequestsMeasured | 318 |
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
| dashboard | loaded | 5460 | 8121 | 0 | 4 | 2 | no |
| projects | loaded | 5439 | 8098 | 0 | 1 | 2 | no |
| project-detail | loaded | 4442 | 7099 | 0 | 2 | 0 | no |
| print-design | loaded | 6430 | 9089 | 1 | 17 | 7 | no |
| print-output | loaded | 4422 | 7080 | 0 | 2 | 6 | no |
| events | loaded | 4949 | 7609 | 0 | 7 | 2 | no |
| workflows | loaded | 4448 | 7106 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4416 | 7074 | 0 | 1 | 1 | no |
| event-types | loaded | 5449 | 8116 | 0 | 85 | 1 | no |
| information-types | loaded | 5424 | 8082 | 0 | 1 | 1 | no |
| procurement | loaded | 3439 | 44680 | 0 | 9 | 0 | no |
| attachments | loaded | 3985 | 6642 | 0 | 1 | 1 | no |
| reports | loaded | 4439 | 7103 | 0 | 8 | 12 | no |
| users | loaded | 6428 | 9084 | 0 | 1 | 1 | no |
| departments | loaded | 4912 | 7571 | 0 | 8 | 1 | no |
| roles | loaded | 4436 | 7095 | 0 | 1 | 1 | no |
| permissions | loaded | 4913 | 7569 | 0 | 0 | 1 | no |
| audit | loaded | 3412 | 6070 | 0 | 1 | 1 | no |
| settings | loaded | 3445 | 6103 | 0 | 1 | 3 | no |
| admin | loaded | 3411 | 6069 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T17:05:24.107Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5470 ms | 3799 ms | /د/س/ت/ر/س/ی/ /2/0/6/2/ /// /ر/و/ت/ر/ /1/7/3/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/9/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/3/m/s/×/1/ |
| /procurement/orders | 5145 ms | 2868 ms | /د/س/ت/ر/س/ی/ /2/0/3/7/ /// /ر/و/ت/ر/ /8/3/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/6/m/s/×/1/ |
| /procurement/needs | 4934 ms | 2766 ms | /د/س/ت/ر/س/ی/ /1/8/5/0/ /// /ر/و/ت/ر/ /9/1/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/9/m/s/×/1/ |
| /procurement/dashboard | 4565 ms | 2594 ms | /د/س/ت/ر/س/ی/ /1/8/1/6/ /// /ر/و/ت/ر/ /7/7/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/9/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/6/6/m/s/×/2/ |
| /procurement/workspace | 15645 ms | 2454 ms | /د/س/ت/ر/س/ی/ /1/7/7/1/ /// /ر/و/ت/ر/ /6/8/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/7/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
