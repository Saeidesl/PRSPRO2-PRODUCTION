# PMS UI and Performance Audit

- Generated: 2026-11-12T10:07:09.103Z
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
| visibleButtonsInventoried | 472 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 354 |
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
| dashboard | loaded | 3985 | 6644 | 0 | 4 | 2 | no |
| projects | loaded | 3429 | 6087 | 0 | 1 | 2 | no |
| project-detail | loaded | 4432 | 7089 | 0 | 2 | 0 | no |
| print-design | loaded | 3920 | 6582 | 1 | 17 | 7 | no |
| print-output | loaded | 2921 | 5580 | 0 | 2 | 6 | no |
| events | loaded | 2415 | 5071 | 0 | 7 | 2 | no |
| workflows | loaded | 3466 | 6124 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3915 | 6572 | 0 | 9 | 1 | no |
| event-types | loaded | 3912 | 6578 | 0 | 85 | 1 | no |
| information-types | loaded | 2907 | 5564 | 0 | 1 | 1 | no |
| procurement | loaded | 4475 | 27161 | 0 | 9 | 0 | no |
| attachments | loaded | 3437 | 6095 | 0 | 1 | 2 | no |
| reports | loaded | 2433 | 5094 | 0 | 8 | 12 | no |
| users | loaded | 3421 | 6079 | 0 | 1 | 1 | no |
| departments | loaded | 2404 | 5063 | 0 | 8 | 1 | no |
| roles | loaded | 4922 | 7580 | 0 | 21 | 1 | no |
| permissions | loaded | 3912 | 6569 | 0 | 0 | 1 | no |
| audit | loaded | 2930 | 5586 | 0 | 1 | 1 | no |
| settings | loaded | 4413 | 7068 | 0 | 1 | 3 | no |
| admin | loaded | 2912 | 5603 | 0 | 293 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T10:09:38.117Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 2906 ms | 1779 ms | /د/س/ت/ر/س/ی/ /8/9/7/ /// /ر/و/ت/ر/ /8/8/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/9/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/9/8/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/0/m/s/×/1/ |
| /procurement/orders | 4405 ms | 2864 ms | /د/س/ت/ر/س/ی/ /1/9/4/0/ /// /ر/و/ت/ر/ /9/2/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/4/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/5/8/6/m/s/×/1/ |
| /procurement/needs | 5946 ms | 1771 ms | /د/س/ت/ر/س/ی/ /1/3/5/3/ /// /ر/و/ت/ر/ /4/1/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/5/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/3/m/s/×/1/ |
| /procurement/dashboard | 2991 ms | 1870 ms | /د/س/ت/ر/س/ی/ /1/3/6/5/ /// /ر/و/ت/ر/ /5/0/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/9/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/8/9/m/s/×/1/ |
| /procurement/workspace | 3445 ms | 1926 ms | /د/س/ت/ر/س/ی/ /1/4/2/2/ /// /ر/و/ت/ر/ /5/0/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/1/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/2/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
