# PMS UI and Performance Audit

- Generated: 2026-11-26T08:37:28.989Z
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
| visibleButtonsInventoried | 196 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 346 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 4373 | 7032 | 0 | 4 | 2 | no |
| projects | loaded | 3878 | 6535 | 0 | 1 | 2 | no |
| project-detail | loaded | 3373 | 6030 | 0 | 2 | 0 | no |
| print-design | loaded | 4867 | 7528 | 1 | 17 | 7 | no |
| print-output | loaded | 3876 | 6531 | 0 | 2 | 6 | no |
| events | loaded | 3867 | 6524 | 0 | 5 | 2 | no |
| workflows | loaded | 3375 | 6032 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4868 | 7525 | 0 | 1 | 1 | no |
| event-types | loaded | 5368 | 8030 | 0 | 85 | 1 | no |
| information-types | loaded | 3378 | 6036 | 0 | 1 | 1 | no |
| procurement | loaded | 4874 | 29113 | 0 | 9 | 0 | no |
| attachments | loaded | 3878 | 6535 | 0 | 1 | 1 | no |
| reports | loaded | 4872 | 7533 | 0 | 8 | 12 | no |
| users | loaded | 3359 | 6017 | 0 | 25 | 1 | no |
| departments | loaded | 4885 | 7542 | 0 | 8 | 1 | no |
| roles | loaded | 3862 | 6517 | 0 | 21 | 1 | no |
| permissions | loaded | 5371 | 8025 | 0 | 0 | 1 | no |
| audit | loaded | 4870 | 7527 | 0 | 1 | 1 | no |
| settings | loaded | 5884 | 8539 | 0 | 1 | 3 | no |
| admin | loaded | 2865 | 5523 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-26T08:40:19.127Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5973 ms | 3626 ms | /د/س/ت/ر/س/ی/ /1/9/8/6/ /// /ر/و/ت/ر/ /1/6/4/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/4/m/s/×/1/ |
| /procurement/orders | 4208 ms | 2274 ms | /د/س/ت/ر/س/ی/ /1/7/4/0/ /// /ر/و/ت/ر/ /5/3/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/9/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/8/7/m/s/×/1/ |
| /procurement/needs | 5381 ms | 3531 ms | /د/س/ت/ر/س/ی/ /2/6/4/1/ /// /ر/و/ت/ر/ /8/8/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/0/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/3/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/8/4/m/s/×/1/ |
| /procurement/dashboard | 2484 ms | 1250 ms | /د/س/ت/ر/س/ی/ /8/8/0/ /// /ر/و/ت/ر/ /3/7/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/2/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/8/9/m/s/×/1/,/ /g/e/t/A/l/l/:/1/7/7/m/s/×/1/ |
| /procurement/workspace | 2725 ms | 1388 ms | /د/س/ت/ر/س/ی/ /9/9/7/ /// /ر/و/ت/ر/ /3/9/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/1/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
