# PMS UI and Performance Audit

- Generated: 2026-11-17T18:17:55.238Z
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
| visibleButtonsInventoried | 178 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 347 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 3043 | 5704 | 0 | 4 | 2 | no |
| projects | loaded | 3432 | 6090 | 0 | 1 | 2 | no |
| project-detail | loaded | 3930 | 6588 | 0 | 2 | 0 | no |
| print-design | loaded | 3921 | 6582 | 1 | 17 | 7 | no |
| print-output | loaded | 3417 | 6074 | 0 | 2 | 6 | no |
| events | loaded | 3935 | 6592 | 0 | 5 | 2 | no |
| workflows | loaded | 2948 | 5606 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3412 | 6069 | 0 | 1 | 1 | no |
| event-types | loaded | 3915 | 6581 | 0 | 85 | 1 | no |
| information-types | loaded | 2927 | 5585 | 0 | 1 | 1 | no |
| procurement | loaded | 3435 | 27280 | 0 | 9 | 0 | no |
| attachments | loaded | 4929 | 7587 | 0 | 1 | 1 | no |
| reports | loaded | 3947 | 6608 | 0 | 8 | 12 | no |
| users | loaded | 3438 | 6097 | 0 | 27 | 1 | no |
| departments | loaded | 3405 | 6062 | 0 | 8 | 1 | no |
| roles | loaded | 3950 | 6608 | 0 | 1 | 1 | no |
| permissions | loaded | 3440 | 6097 | 0 | 0 | 1 | no |
| audit | loaded | 4918 | 7575 | 0 | 1 | 1 | no |
| settings | loaded | 4436 | 7094 | 0 | 1 | 3 | no |
| admin | loaded | 4453 | 7112 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T18:20:27.045Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5412 ms | 3576 ms | /د/س/ت/ر/س/ی/ /1/6/6/0/ /// /ر/و/ت/ر/ /1/9/1/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/5/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/6/m/s/×/1/ |
| /procurement/orders | 4464 ms | 2113 ms | /د/س/ت/ر/س/ی/ /1/4/8/8/ /// /ر/و/ت/ر/ /6/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/9/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/6/m/s/×/1/ |
| /procurement/needs | 3120 ms | 1404 ms | /د/س/ت/ر/س/ی/ /9/4/3/ /// /ر/و/ت/ر/ /4/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/8/0/m/s/×/1/,/ /g/e/t/A/l/l/:/1/7/8/m/s/×/1/ |
| /procurement/dashboard | 4512 ms | 2704 ms | /د/س/ت/ر/س/ی/ /1/9/2/6/ /// /ر/و/ت/ر/ /7/7/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/6/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/6/7/m/s/×/1/ |
| /procurement/workspace | 2859 ms | 1614 ms | /د/س/ت/ر/س/ی/ /1/1/8/5/ /// /ر/و/ت/ر/ /4/2/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/1/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/6/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
