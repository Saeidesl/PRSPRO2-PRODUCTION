# PMS UI and Performance Audit

- Generated: 2026-11-09T14:18:44.792Z
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
| visibleButtonsInventoried | 179 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 354 |
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
| dashboard | loaded | 3477 | 6139 | 0 | 4 | 2 | no |
| projects | loaded | 2925 | 5584 | 0 | 1 | 2 | no |
| project-detail | loaded | 4429 | 7086 | 0 | 2 | 0 | no |
| print-design | loaded | 3914 | 6574 | 1 | 15 | 6 | no |
| print-output | loaded | 2922 | 5581 | 0 | 2 | 6 | no |
| events | loaded | 3921 | 6580 | 0 | 7 | 2 | no |
| workflows | loaded | 4445 | 7102 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3928 | 6585 | 0 | 1 | 1 | no |
| event-types | loaded | 2919 | 5588 | 0 | 82 | 1 | no |
| information-types | loaded | 6929 | 9585 | 0 | 1 | 1 | no |
| procurement | loaded | 4484 | 26899 | 0 | 9 | 0 | no |
| attachments | loaded | 3922 | 6583 | 0 | 31 | 2 | no |
| reports | loaded | 3405 | 6067 | 0 | 8 | 12 | no |
| users | loaded | 6927 | 9585 | 0 | 1 | 1 | no |
| departments | loaded | 2919 | 5578 | 0 | 8 | 1 | no |
| roles | loaded | 3441 | 6097 | 0 | 1 | 1 | no |
| permissions | loaded | 3452 | 6107 | 0 | 0 | 1 | no |
| audit | loaded | 3433 | 6092 | 0 | 1 | 1 | no |
| settings | loaded | 2975 | 5633 | 0 | 1 | 3 | no |
| admin | loaded | 3422 | 6080 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T14:21:29.772Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4059 ms | 2817 ms | /د/س/ت/ر/س/ی/ /1/4/3/2/ /// /ر/و/ت/ر/ /1/3/8/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/5/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/9/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/6/3/m/s/×/1/ |
| /procurement/orders | 3834 ms | 2050 ms | /د/س/ت/ر/س/ی/ /1/3/1/8/ /// /ر/و/ت/ر/ /7/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/5/m/s/×/1/ |
| /procurement/needs | 3401 ms | 2323 ms | /د/س/ت/ر/س/ی/ /1/1/4/8/ /// /ر/و/ت/ر/ /1/1/7/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/0/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/5/8/m/s/×/2/ |
| /procurement/dashboard | 4301 ms | 2827 ms | /د/س/ت/ر/س/ی/ /2/0/9/4/ /// /ر/و/ت/ر/ /7/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/9/m/s/×/1/,/ /g/e/t/A/l/l/:/5/9/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/7/9/m/s/×/1/ |
| /procurement/workspace | 3324 ms | 1850 ms | /د/س/ت/ر/س/ی/ /1/3/9/3/ /// /ر/و/ت/ر/ /4/5/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/7/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
