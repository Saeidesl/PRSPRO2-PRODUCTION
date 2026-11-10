# PMS UI and Performance Audit

- Generated: 2026-11-10T17:43:39.523Z
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
| visibleButtonsInventoried | 302 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 332 |
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
| dashboard | loaded | 4462 | 7123 | 0 | 4 | 2 | no |
| projects | loaded | 3914 | 6572 | 0 | 1 | 2 | no |
| project-detail | loaded | 2905 | 5563 | 0 | 2 | 0 | no |
| print-design | loaded | 3405 | 6067 | 1 | 17 | 7 | no |
| print-output | loaded | 4916 | 7574 | 0 | 2 | 6 | no |
| events | loaded | 3408 | 6064 | 0 | 7 | 2 | no |
| workflows | loaded | 3922 | 6578 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5915 | 8570 | 0 | 1 | 1 | no |
| event-types | loaded | 8085 | 10741 | 0 | 0 | 0 | no |
| information-types | loaded | 3406 | 6063 | 0 | 1 | 1 | no |
| procurement | loaded | 3959 | 38044 | 0 | 9 | 0 | no |
| attachments | loaded | 3432 | 6089 | 0 | 1 | 2 | no |
| reports | loaded | 4944 | 7608 | 0 | 8 | 12 | no |
| users | loaded | 3914 | 6569 | 0 | 1 | 1 | no |
| departments | loaded | 5947 | 8603 | 0 | 8 | 1 | no |
| roles | loaded | 3951 | 6609 | 0 | 21 | 1 | no |
| permissions | loaded | 4411 | 7068 | 0 | 0 | 1 | no |
| audit | loaded | 3946 | 6604 | 0 | 1 | 1 | no |
| settings | loaded | 2907 | 5565 | 0 | 1 | 3 | no |
| admin | loaded | 3416 | 6101 | 0 | 216 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T17:46:25.939Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 8679 ms | 6891 ms | /د/س/ت/ر/س/ی/ /4/7/6/9/ /// /ر/و/ت/ر/ /2/1/2/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/6/0/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/8/3/8/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/8/3/4/m/s/×/1/ |
| /procurement/orders | 5379 ms | 3690 ms | /د/س/ت/ر/س/ی/ /2/5/4/1/ /// /ر/و/ت/ر/ /1/1/4/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/7/m/s/×/1/,/ /g/e/t/A/l/l/:/7/7/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/0/m/s/×/1/ |
| /procurement/needs | 5633 ms | 3982 ms | /د/س/ت/ر/س/ی/ /3/1/7/2/ /// /ر/و/ت/ر/ /8/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/6/5/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/3/8/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/3/8/2/m/s/×/1/ |
| /procurement/dashboard | 5857 ms | 3531 ms | /د/س/ت/ر/س/ی/ /2/5/6/7/ /// /ر/و/ت/ر/ /9/6/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/3/2/m/s/×/1/,/ /g/e/t/A/l/l/:/8/9/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/7/2/m/s/×/1/ |
| /procurement/workspace | 3552 ms | 1865 ms | /د/س/ت/ر/س/ی/ /1/2/1/9/ /// /ر/و/ت/ر/ /6/4/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
