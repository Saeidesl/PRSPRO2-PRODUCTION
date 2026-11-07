# PMS UI and Performance Audit

- Generated: 2026-11-07T10:39:42.703Z
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
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 324 |
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
| dashboard | loaded | 3471 | 6132 | 0 | 4 | 2 | no |
| projects | loaded | 3956 | 6613 | 0 | 1 | 2 | no |
| project-detail | loaded | 3922 | 6579 | 0 | 2 | 0 | no |
| print-design | loaded | 2909 | 5568 | 1 | 14 | 5 | no |
| print-output | loaded | 3407 | 6064 | 0 | 1 | 2 | no |
| events | loaded | 4435 | 7090 | 0 | 7 | 2 | no |
| workflows | loaded | 3924 | 6583 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4414 | 7070 | 0 | 1 | 1 | no |
| event-types | loaded | 3905 | 6571 | 0 | 58 | 1 | no |
| information-types | loaded | 2903 | 5560 | 0 | 1 | 1 | no |
| procurement | loaded | 3912 | 27612 | 0 | 9 | 0 | no |
| attachments | loaded | 3406 | 6063 | 0 | 1 | 2 | no |
| reports | loaded | 3960 | 6623 | 0 | 8 | 12 | no |
| users | loaded | 4413 | 7067 | 0 | 1 | 1 | no |
| departments | loaded | 3904 | 6562 | 0 | 8 | 1 | no |
| roles | loaded | 5451 | 8108 | 0 | 1 | 1 | no |
| permissions | loaded | 3899 | 6553 | 0 | 0 | 1 | no |
| audit | loaded | 4907 | 7565 | 0 | 1 | 1 | no |
| settings | loaded | 4409 | 7064 | 0 | 1 | 3 | no |
| admin | loaded | 3947 | 6603 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T10:42:24.514Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5293 ms | 3616 ms | /د/س/ت/ر/س/ی/ /2/3/3/7/ /// /ر/و/ت/ر/ /1/2/7/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/3/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/5/3/m/s/×/1/,/ /g/e/t/A/l/l/:/5/7/3/m/s/×/1/ |
| /procurement/orders | 3506 ms | 2476 ms | /د/س/ت/ر/س/ی/ /1/5/7/0/ /// /ر/و/ت/ر/ /9/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/7/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/6/5/m/s/×/1/ |
| /procurement/needs | 2831 ms | 1905 ms | /د/س/ت/ر/س/ی/ /1/2/7/8/ /// /ر/و/ت/ر/ /6/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/9/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/ |
| /procurement/dashboard | 4024 ms | 2450 ms | /د/س/ت/ر/س/ی/ /1/4/5/1/ /// /ر/و/ت/ر/ /9/9/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/3/m/s/×/1/ |
| /procurement/workspace | 4565 ms | 3242 ms | /د/س/ت/ر/س/ی/ /2/1/3/2/ /// /ر/و/ت/ر/ /1/1/0/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/6/0/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/4/6/m/s/×/2/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
