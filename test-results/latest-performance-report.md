# PMS UI and Performance Audit

- Generated: 2026-11-10T19:29:41.444Z
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
| visibleButtonsInventoried | 208 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 355 |
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
| dashboard | loaded | 3474 | 6137 | 0 | 4 | 2 | no |
| projects | loaded | 2420 | 5079 | 0 | 1 | 2 | no |
| project-detail | loaded | 2923 | 5581 | 0 | 2 | 0 | no |
| print-design | loaded | 3919 | 6580 | 1 | 17 | 7 | no |
| print-output | loaded | 4461 | 7119 | 0 | 2 | 6 | no |
| events | loaded | 3922 | 6578 | 0 | 7 | 2 | no |
| workflows | loaded | 3949 | 6605 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3419 | 6078 | 0 | 9 | 1 | no |
| event-types | loaded | 4446 | 7114 | 0 | 85 | 1 | no |
| information-types | loaded | 3917 | 6576 | 0 | 1 | 1 | no |
| procurement | loaded | 3441 | 29511 | 0 | 9 | 0 | no |
| attachments | loaded | 3925 | 6583 | 0 | 1 | 2 | no |
| reports | loaded | 6445 | 9107 | 0 | 8 | 12 | no |
| users | loaded | 4924 | 7583 | 0 | 27 | 1 | no |
| departments | loaded | 2914 | 5573 | 0 | 8 | 1 | no |
| roles | loaded | 3440 | 6100 | 0 | 21 | 1 | no |
| permissions | loaded | 3989 | 6646 | 0 | 0 | 1 | no |
| audit | loaded | 3918 | 6576 | 0 | 1 | 1 | no |
| settings | loaded | 4921 | 7579 | 0 | 1 | 3 | no |
| admin | loaded | 6931 | 9589 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T19:32:25.909Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6201 ms | 4749 ms | /د/س/ت/ر/س/ی/ /3/0/3/5/ /// /ر/و/ت/ر/ /1/7/1/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/1/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/8/9/m/s/×/1/ |
| /procurement/orders | 4651 ms | 2508 ms | /د/س/ت/ر/س/ی/ /1/7/8/8/ /// /ر/و/ت/ر/ /7/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/0/m/s/×/1/ |
| /procurement/needs | 3620 ms | 2068 ms | /د/س/ت/ر/س/ی/ /1/5/2/4/ /// /ر/و/ت/ر/ /5/4/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/3/1/m/s/×/1/ |
| /procurement/dashboard | 4830 ms | 3046 ms | /د/س/ت/ر/س/ی/ /2/1/0/4/ /// /ر/و/ت/ر/ /9/4/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/0/m/s/×/1/,/ /g/e/t/A/l/l/:/5/6/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/2/m/s/×/1/ |
| /procurement/workspace | 3291 ms | 1508 ms | /د/س/ت/ر/س/ی/ /9/9/8/ /// /ر/و/ت/ر/ /5/0/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/3/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
