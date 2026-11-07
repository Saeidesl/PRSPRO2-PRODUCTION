# PMS UI and Performance Audit

- Generated: 2026-11-07T10:06:26.716Z
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
| visibleButtonsInventoried | 143 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 302 |
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
| dashboard | loaded | 4492 | 7153 | 0 | 4 | 2 | no |
| projects | loaded | 5937 | 8592 | 0 | 1 | 2 | no |
| project-detail | loaded | 4925 | 7585 | 0 | 2 | 0 | no |
| print-design | loaded | 3919 | 6580 | 1 | 14 | 5 | no |
| print-output | loaded | 3914 | 6569 | 0 | 1 | 2 | no |
| events | loaded | 3969 | 6628 | 0 | 7 | 2 | no |
| workflows | loaded | 3930 | 6585 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3913 | 6571 | 0 | 1 | 1 | no |
| event-types | loaded | 3931 | 6597 | 0 | 58 | 1 | no |
| information-types | loaded | 5418 | 8077 | 0 | 1 | 1 | no |
| procurement | loaded | 3420 | 32595 | 0 | 9 | 0 | no |
| attachments | loaded | 3405 | 6063 | 0 | 1 | 2 | no |
| reports | loaded | 4415 | 7079 | 0 | 8 | 12 | no |
| users | loaded | 3974 | 6632 | 0 | 1 | 1 | no |
| departments | loaded | 3912 | 6570 | 0 | 8 | 1 | no |
| roles | loaded | 3915 | 6573 | 0 | 21 | 1 | no |
| permissions | loaded | 4408 | 7065 | 0 | 0 | 1 | no |
| audit | loaded | 3911 | 6570 | 0 | 1 | 1 | no |
| settings | loaded | 3912 | 6570 | 0 | 1 | 3 | no |
| admin | loaded | 4424 | 7081 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T10:09:23.409Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5561 ms | 3717 ms | /د/س/ت/ر/س/ی/ /2/1/8/6/ /// /ر/و/ت/ر/ /1/5/3/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/5/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/8/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/2/9/m/s/×/1/ |
| /procurement/orders | 4334 ms | 2956 ms | /د/س/ت/ر/س/ی/ /2/2/5/3/ /// /ر/و/ت/ر/ /7/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/9/4/m/s/×/1/,/ /g/e/t/A/l/l/:/6/6/0/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/2/m/s/×/1/ |
| /procurement/needs | 4369 ms | 3024 ms | /د/س/ت/ر/س/ی/ /1/9/8/8/ /// /ر/و/ت/ر/ /1/0/3/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/4/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/5/3/1/m/s/×/1/ |
| /procurement/dashboard | 5515 ms | 3449 ms | /د/س/ت/ر/س/ی/ /1/9/4/1/ /// /ر/و/ت/ر/ /1/5/0/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/9/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/9/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/9/m/s/×/1/ |
| /procurement/workspace | 4403 ms | 2573 ms | /د/س/ت/ر/س/ی/ /1/8/0/8/ /// /ر/و/ت/ر/ /7/6/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
