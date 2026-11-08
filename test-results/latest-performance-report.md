# PMS UI and Performance Audit

- Generated: 2026-11-08T11:29:59.654Z
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
| visibleButtonsInventoried | 123 |
| visibleInputsAndControlsInventoried | 43 |
| networkRequestsMeasured | 341 |
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
| dashboard | loaded | 3977 | 6638 | 0 | 4 | 2 | no |
| projects | loaded | 3929 | 6587 | 0 | 1 | 2 | no |
| project-detail | loaded | 3915 | 6573 | 0 | 2 | 0 | no |
| print-design | loaded | 4425 | 7085 | 1 | 14 | 6 | no |
| print-output | loaded | 3916 | 6574 | 0 | 1 | 2 | no |
| events | loaded | 3410 | 6069 | 0 | 7 | 2 | no |
| workflows | loaded | 3954 | 6612 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4417 | 7074 | 0 | 1 | 1 | no |
| event-types | loaded | 3938 | 6602 | 0 | 58 | 1 | no |
| information-types | loaded | 3416 | 6070 | 0 | 1 | 1 | no |
| procurement | loaded | 5419 | 29477 | 0 | 9 | 0 | no |
| attachments | loaded | 4412 | 7070 | 0 | 1 | 2 | no |
| reports | loaded | 3939 | 6601 | 0 | 8 | 12 | no |
| users | loaded | 4413 | 7068 | 0 | 1 | 1 | no |
| departments | loaded | 3419 | 6077 | 0 | 8 | 1 | no |
| roles | loaded | 3912 | 6569 | 0 | 1 | 1 | no |
| permissions | loaded | 3914 | 6571 | 0 | 0 | 1 | no |
| audit | loaded | 2921 | 5579 | 0 | 1 | 1 | no |
| settings | loaded | 4414 | 7071 | 0 | 1 | 3 | no |
| admin | loaded | 3910 | 6567 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T11:32:40.467Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4910 ms | 3112 ms | /د/س/ت/ر/س/ی/ /1/5/2/9/ /// /ر/و/ت/ر/ /1/5/8/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/8/m/s/×/1/ |
| /procurement/orders | 4417 ms | 2787 ms | /د/س/ت/ر/س/ی/ /2/0/0/5/ /// /ر/و/ت/ر/ /7/8/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/8/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/8/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/4/m/s/×/1/ |
| /procurement/needs | 2910 ms | 2011 ms | /د/س/ت/ر/س/ی/ /1/6/4/0/ /// /ر/و/ت/ر/ /3/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/2/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/7/m/s/×/1/ |
| /procurement/dashboard | 4257 ms | 3002 ms | /د/س/ت/ر/س/ی/ /1/9/0/1/ /// /ر/و/ت/ر/ /1/1/0/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/6/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/6/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/4/m/s/×/1/ |
| /procurement/workspace | 4591 ms | 2604 ms | /د/س/ت/ر/س/ی/ /1/8/8/7/ /// /ر/و/ت/ر/ /7/1/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/0/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/5/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
