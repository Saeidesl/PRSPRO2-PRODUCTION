# PMS UI and Performance Audit

- Generated: 2026-11-17T07:11:53.700Z
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
| networkRequestsMeasured | 277 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 4 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 5476 | 8138 | 0 | 4 | 2 | no |
| projects | loaded | 4438 | 7096 | 0 | 1 | 2 | no |
| project-detail | loaded | 4924 | 7583 | 0 | 2 | 0 | no |
| print-design | loaded | 3934 | 6596 | 1 | 17 | 7 | no |
| print-output | loaded | 4416 | 7073 | 0 | 2 | 6 | no |
| events | loaded | 3417 | 6076 | 0 | 5 | 2 | no |
| workflows | loaded | 3466 | 6124 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4416 | 7074 | 0 | 1 | 1 | no |
| event-types | loaded | 4939 | 7606 | 0 | 85 | 1 | no |
| information-types | loaded | 3914 | 6572 | 0 | 1 | 1 | no |
| procurement | loaded | 4940 | 39527 | 0 | 9 | 0 | no |
| attachments | loaded | 5422 | 8077 | 0 | 1 | 1 | no |
| reports | loaded | 4912 | 7574 | 0 | 8 | 12 | no |
| users | loaded | 4413 | 7071 | 0 | 1 | 1 | no |
| departments | loaded | 3908 | 6568 | 0 | 8 | 1 | no |
| roles | loaded | 4911 | 7569 | 0 | 1 | 1 | no |
| permissions | loaded | 4422 | 7081 | 0 | 0 | 1 | no |
| audit | loaded | 4912 | 7579 | 0 | 1 | 1 | no |
| settings | loaded | 5979 | 8634 | 0 | 1 | 3 | no |
| admin | loaded | 8106 | 10762 | 0 | 0 | 0 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T07:14:59.910Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5541 ms | 4021 ms | /د/س/ت/ر/س/ی/ /2/4/5/7/ /// /ر/و/ت/ر/ /1/5/6/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/7/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/8/5/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/4/0/m/s/×/1/ |
| /procurement/orders | 4307 ms | 2398 ms | /د/س/ت/ر/س/ی/ /1/6/1/3/ /// /ر/و/ت/ر/ /7/8/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/5/m/s/×/1/ |
| /procurement/needs | 5280 ms | 3096 ms | /د/س/ت/ر/س/ی/ /1/9/2/3/ /// /ر/و/ت/ر/ /1/1/7/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/9/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/9/3/m/s/×/1/ |
| /procurement/dashboard | 3706 ms | 2110 ms | /د/س/ت/ر/س/ی/ /1/4/5/6/ /// /ر/و/ت/ر/ /6/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/4/m/s/×/1/ |
| /procurement/workspace | 9257 ms | 5646 ms | /د/س/ت/ر/س/ی/ /3/1/7/5/ /// /ر/و/ت/ر/ /2/4/7/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/6/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/2/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/8/5/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
