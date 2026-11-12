# PMS UI and Performance Audit

- Generated: 2026-11-12T16:12:58.369Z
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
| networkRequestsMeasured | 305 |
| procurementApiRequestsMeasured | 6 |
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
| dashboard | loaded | 5985 | 8646 | 0 | 4 | 2 | no |
| projects | loaded | 6939 | 9596 | 0 | 1 | 2 | no |
| project-detail | loaded | 3933 | 6590 | 0 | 2 | 0 | no |
| print-design | loaded | 4921 | 7582 | 1 | 17 | 7 | no |
| print-output | loaded | 8106 | 10761 | 0 | 2 | 6 | no |
| events | loaded | 4930 | 7588 | 0 | 7 | 2 | no |
| workflows | loaded | 5957 | 8613 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4423 | 7081 | 0 | 1 | 1 | no |
| event-types | loaded | 6428 | 9095 | 0 | 85 | 1 | no |
| information-types | loaded | 3919 | 6578 | 0 | 1 | 1 | no |
| procurement | loaded | 4439 | 33845 | 0 | 9 | 0 | no |
| attachments | loaded | 6430 | 9087 | 0 | 1 | 1 | no |
| reports | loaded | 4441 | 7103 | 0 | 8 | 12 | no |
| users | loaded | 4429 | 7088 | 0 | 1 | 1 | no |
| departments | loaded | 4932 | 7594 | 0 | 8 | 1 | no |
| roles | loaded | 3495 | 6153 | 0 | 1 | 1 | no |
| permissions | loaded | 3917 | 6574 | 0 | 0 | 1 | no |
| audit | loaded | 3918 | 6573 | 0 | 1 | 1 | no |
| settings | loaded | 4925 | 7583 | 0 | 1 | 3 | no |
| admin | loaded | 2956 | 5615 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T16:16:23.681Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5137 ms | 3247 ms | /د/س/ت/ر/س/ی/ /1/9/4/4/ /// /ر/و/ت/ر/ /1/3/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/4/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/1/m/s/×/1/ |
| /procurement/orders | 7194 ms | 2497 ms | /د/س/ت/ر/س/ی/ /1/9/0/2/ /// /ر/و/ت/ر/ /5/9/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/6/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/0/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/3/m/s/×/1/ |
| /procurement/needs | 5232 ms | 3547 ms | /د/س/ت/ر/س/ی/ /2/7/9/2/ /// /ر/و/ت/ر/ /7/5/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/8/7/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/3/2/m/s/×/1/ |
| /procurement/dashboard | 4326 ms | 2347 ms | /د/س/ت/ر/س/ی/ /1/7/4/7/ /// /ر/و/ت/ر/ /6/0/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/8/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/2/m/s/×/1/ |
| /procurement/workspace | 3501 ms | 2222 ms | /د/س/ت/ر/س/ی/ /1/5/9/3/ /// /ر/و/ت/ر/ /6/2/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/2/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
